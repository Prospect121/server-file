import {Router} from 'express';
import fs from 'fs/promises';
const router = new Router();
// const fileName = './src/data.txt';

router.post('/api/new-data', async (req, res) => {
  const {route, data} = req.body;
  if (Object.keys(req.body).length === 0 || typeof data === 'undefined' ||
  Object.keys(data).length === 0) {
    return res.status(400).json(
        {
          error: 'Bad Request',
          msj: 'Data was not received.',
        },
    );
  }
  try {
    const dataStr = JSON.stringify(data);
    await fs.appendFile(route, `${dataStr}\n`);
    res.status(200).send('Saved data.');
  } catch (err) {
    if (err.code === 'ENOENT' && err.errno === -4058) {
      return res.status(404).json(
          {
            msj: 'the path for the file does not exist.',
          },
      );
    }
    res.status(500).json(
        {
          error: err,
        },
    );
  }
});

export default router;
