/**
 * From: https://buttondown.email/cassidoo/archive/if-you-dont-risk-anything-you-risk-even-more/
 *
 * Given a string array representing a tic-tac-toe board, return true if and only if
 * it’s possible to reach this board position during the course of a valid
 * tic-tac-toe game. You can assume the first player will always play X first,
 * and players will only fill in blank spaces. The game will end if there is 3 in a row,
 * column, or diagonal, or if the board is full.
 *
 * Example:
 *   $ validTTTPosition([“XOX”, ” X “, ”   “])
 *   $ false
 *   $ validTTTPosition([“XOX”, “O O”, “XOX”])
 *   $ true
 *   $ validTTTPosition([“OOO”, ”   “, “XXX”])
 *   $ false
 *   $ validTTTPosition([”  O”, ”   “, ”   “])
 *   $ false
 */

// Tic Tac Toe is simple enough that one way to crack this would be to just generate a
// list of all 549,946 valid moves from the starting position, and compare every one to
// the board passed in. But, it's more fun to treat this like a serious search, and
// write it so with a few alterations you could check for valid moves for a game like
// Checkers.

// First let's get some of the basics out of the way -- we need a way to tell if the
// game is over given a particular board.

function isGameOver(board) {
    for (let marker of ['O', 'X']) {
        // A player horizontally / vertically?
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === marker && board[i][1] === marker && board[i][2] === marker) return true;
            if (board[0][i] === marker && board[1][i] === marker && board[2][i] === marker) return true;
        }
        // A player won diagonally?
        if (board[0][0] === marker && board[1][1] === marker && board[2][2] === marker) return true;
        if (board[2][0] === marker && board[1][1] === marker && board[0][2] === marker) return true;
    }

    // Ended in a draw?
    if (board.join('').indexOf(' ') === -1) return true;

    // Still playing
    return false;
}

// Now we need a way to generate the valid next moves from a given game state. Unlike
// a more complex game (like Checkers or Chess), we can deduce who's move is it just from
// the markers already on the board, so a board is a valid game state on its own.a

function validMoves(board) {
    if (isGameOver(board)) return [];

    // Determine who plays next
    let markers = [...board.join('')];
    let xs = markers.filter(c => c === 'X').length;
    let os = markers.filter(c => c === 'O').length;
    let play = os < xs ? 'O' : 'X';

    let moves = [];

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (board[r][c] === ' ') {
                let move = [...board];
                move[r] = move[r].slice(0, c) + play + move[r].slice(c + 1);
                moves.push(move);
            }
        }
    }

    return moves;
}

// Next is a heuristic function, which lets us measure how close a given position
// is to the goal state. (Without this function, we're just doing unguided
// breadth- or depth-first searching.)
//
// We want to give higher scores for boards with matching markers, with partial
// credit for spaces where the board has a space and the goal has a marker (because
// this is a state we could reach). We heavily punish a board that has a DIFFERENT
// marker in a given position, as this will never reach the goal.
//
// This function returns a score in the range of [-81, 9], where:
//
//   -81 is a perfectly inverted board (every X/O marker is flipped)
//   4.5 is the bare minimum score where the goal is reachable
//     9 is a perfect match (we reached the goal)

function howClose(possible, goal) {
    let score = 0;
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (possible[r][c] === goal[r][c]) {
                score += 1;
            } else if (possible[r][c] === ' ' && goal[r][c] !== ' ') {
                score += 0.5;
            } else {
                score -= 9;
            }
        }
    }
    return score;
}

// Now for the fun part, a sort-of A* search of the game space.

function validTTTPosition(board) {
    // Our stack of boards to check starts with a pristine playing field.
    let stack = [
        ['   ', '   ', '   ']
    ];

    while (stack.length > 0) {
        let wip = stack.pop();

        // If we've found our board, we're done!
        if (howClose(wip, board) === 9) return true;

        // At this point, we could just add all valid moves to the stack,
        // but this is a brute-force breadth-first search -- we would check
        // all 549,946 possible moves before we could return FALSE. Instead,
        // we can use our heuristic function above to help guide us, resulting
        // in most cases of a search space of <200 board positions.

        // First, don't even bother adding moves that can't reach the goal. A score
        // of 4.5 is the minimum required.
        stack = stack.concat(
            validMoves(wip).filter(possible => howClose(possible, board) >= 4.5)
        );

        // Next, let's sort the stack so the states closest to the goal are
        // searched first.
        stack = stack.sort((a, b) => howClose(a, board) - howClose(b, board));
    }

    return false;
}

describe('validTTTPosition', function () {
    it('returns false for example 1', function () {
        expect(validTTTPosition([
            'XOX',
            ' X ',
            '   '
        ])).toBe(false);
    });

    it('returns true for example 2', function () {
        expect(validTTTPosition([
            'XOX',
            'O O',
            'XOX'
        ])).toBe(true);
    });

    it('returns false for example 3', function () {
        expect(validTTTPosition([
            'OOO',
            '   ',
            'XXX'
        ])).toBe(false);
    });

    it('returns false for example 4', function () {
        expect(validTTTPosition([
            '  O',
            '   ',
            '   '
        ])).toBe(false);
    });

    it('returns true for an empty board', function () {
        expect(validTTTPosition([
            '   ',
            '   ',
            '   '
        ])).toBe(true);
    });

    it('returns true for a diagonal win', function () {
        expect(validTTTPosition([
            'XO ',
            ' X ',
            ' OX'
        ])).toBe(true);
    });

    it('returns false for a diagonal win with an extra O', function () {
        expect(validTTTPosition([
            'XO ',
            ' X ',
            'OOX'
        ])).toBe(false);
    });
});
