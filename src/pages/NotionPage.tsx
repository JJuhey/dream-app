import React, { useEffect } from 'react';
import { Client } from '@notionhq/client';

import { NOTION_BASE_URL, NOTION_DATABASE, NOTION_TOKEN } from '../config';

import AuthLayout from '../components/AuthLayout';

const notion = new Client({ auth: NOTION_TOKEN, baseUrl: NOTION_BASE_URL });

const NotionPage = () => {
  useEffect(() => {
    getNotionData()
  }, []);

  return (
    <AuthLayout>
      <div>NOTION PAGE</div>
    </AuthLayout>
  );
}

async function getNotionData() {
  if (!NOTION_TOKEN || !NOTION_DATABASE) return []

  // const response = await notion.databases.retrieve({ database_id: NOTION_DATABASE });

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Notion-Version': '2022-06-28',
      'content-type': 'application/json',
      Authorization: `Bearer ${NOTION_TOKEN}`
    },
    body: JSON.stringify({
      sorts: [
        {
          "property": "Title",
          "direction": "ascending"
        }
      ],
      page_size: 100,
    })
  };
  
  try {
    const response = await fetch(`${NOTION_BASE_URL}/${NOTION_DATABASE}/query`, options)
    const data = await response.json()
    console.log(data)
  
    return data
  } catch(err) {
    console.log(err)
    throw err
  }
}

export default NotionPage;
