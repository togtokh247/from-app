import { revalidatePath } from 'next/cache';
import service from '../service.mjs';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { db } = service.load();
  const messages = await db.client.orm.public.Message
    .select('id', 'text', 'createdAt')
    .orderBy((m) => m.createdAt.desc())
    .limit(20)
    .all();

  async function addMessage(formData: FormData) {
    'use server';
    const text = String(formData.get('text') ?? '').trim();
    if (text.length > 0) {
      const { db } = service.load();
      await db.client.orm.public.Message.create({ text });
    }
    revalidatePath('/');
  }

  return (
    <main>
      <h1>from-app</h1>
      <p>A Next.js app running on Prisma Compute, backed by Prisma ORM 8.</p>
      <form action={addMessage}>
        <input name="text" placeholder="Say something…" required />
        <button type="submit">Add</button>
      </form>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            {message.text}
          </li>
        ))}
      </ul>
    </main>
  );
}
