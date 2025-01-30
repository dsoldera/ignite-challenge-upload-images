import { Client, FaunaError, fql } from "fauna";
import { v4 as uuid } from 'uuid';

import type { NextApiRequest, NextApiResponse } from 'next';
const client = new Client({ secret: process.env.FAUNA_API_KEY });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'POST') {
    const { url, title, description } = req.body;

    try {
      const query = fql`Collection("Images").create({
        title: ${title},
        description: ${description},
        imgId: ${uuid()},
        url: ${url}
      })`
  
      const response = await client.query(query);
      console.log('Response', response.data);
      res.status(201).json(response.data)
    } catch(error) {
      if (error instanceof FaunaError) {
        console.log(error);
      }
    }
  }
  if (req.method === 'GET') {
    try {
      const query =  fql`
       Images.all() {
        id,
        title, 
        description, 
        url
      }`;

      const response = await client.query(query);
      console.log('Response', response.data);
      res.status(200).json(response.data)
    
    } catch (error) {
    if (error instanceof FaunaError) {
        console.log(error);
      }
    } 
  }
}


