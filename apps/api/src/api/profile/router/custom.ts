// apps/api/src/api/profile/router/custom.ts

import { NextApiRequest, NextApiResponse } from 'next';

// I get an error while I have trying to fetch profile information, am I using the right function? I cannot import this function. 
import { getSessionUser } from '../../../../../../packages/services/src/auth/getSessionUser';

// Should I import getAuth here? 


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    // how can I add outomated token here? 
    const userToken = 'burayaKullanıcınınTokenBilgisi';
    const user = await getSessionUser(userToken);

    const profile = await user; 

    
    const singleResponse = Array.isArray(profile) ? profile[0] : profile;

    res.status(200).json(singleResponse);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message || 'Internal Server Error' });
  }
}
