import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { removeAccents } from '@/pages/utils/charactor-util';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const queryTitle = req.query.id as string;
    const tags = req.query.tags as string;

    if (!queryTitle) {
      return res.status(400).json({ error: 'Invalid title query' });
    }
 
    const tagArray = tags.toString().split(",");
    try {
      const listBook = await prisma.book.findMany({
        where: {
          BookTypeId: {
            in: Array.isArray(tagArray) ? tagArray.map(e => parseInt(e)) : [parseInt(tagArray)]
          }
        }
      });
      const query = removeAccents(queryTitle).toLocaleLowerCase();
      const books = listBook?.filter((book) => 
      {
        const title = removeAccents(book.Title).toLocaleLowerCase();
        return title.includes(query);
      });

      if (books.length > 0) {
        res.status(200).json(books);
      } else {
        res.status(404).json({ error: 'No books found with the given title query' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
