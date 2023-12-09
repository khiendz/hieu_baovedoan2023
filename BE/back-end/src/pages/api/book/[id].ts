import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { apiHandler } from '@/helpers/api';

const prisma = new PrismaClient();

const handler =  async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "OPTIONS") {
    res.setHeader("Allow", "POST");
    return res.status(202).json({});
}

  if (req.method === 'GET') {
    const bookId = parseInt(req.query.id as string);

    if (!bookId) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }

    try {
      const book = await prisma.book.findUnique({
        where: {
           BookId: bookId,
        },
        include: {
          Publisher: true,
          Author: true,
          BorrowedBook: true,
          Book_BookType: {
              include: {
                  BookType: true
              }
          }
        }
      });

      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default apiHandler(handler,["GET"]);