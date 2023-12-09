import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { removeAccents } from '@/pages/utils/charactor-util';
import { apiHandler } from '@/helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST');
    return res.status(202).json({});
  }

  if (req.method === 'GET') {
    const queryTitle = req.query.id as string;
    const tags = req.query.tags as string;

    if (!queryTitle) {
      return res.status(400).json({ error: 'Invalid title query' });
    }

    const tagArray = tags ? tags.split(',').map(e => parseInt(e)) : [];

    try {
      let listBook = await prisma.book.findMany();
    
      if (tags && tags != '' && tagArray) {
        listBook = await prisma.book.findMany({
          where: {
            Book_BookType: {
              some: {
                BookTypeId: {
                  in: tagArray.length > 0 ? tagArray : [0]
                }
              }
            }
          }
        });
      }

      const query = removeAccents(queryTitle).toLocaleLowerCase();
      const books = listBook.filter((book) => {
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


export default apiHandler(handler,["GET"]);
