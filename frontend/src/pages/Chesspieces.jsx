/* classe Chesspieces {
      containts chess piece, associated image square it's placed on, procedure to assure the move is legal or illegal
    
*/ 
class Chesspieces {
    constructor(image, square, legalty){
        this.image = image;
        this.square = square;
        this.legalty = legalty;
    }
    BB = new Chesspieces("♝", "c8", true);
}