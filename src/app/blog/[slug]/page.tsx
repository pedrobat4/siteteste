import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blogPosts } from '@/lib/data';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return {
      title: 'Not Found',
    }
  }
  return {
    title: `${post.title} - LexPro Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-background py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <article className="max-w-4xl mx-auto bg-card p-6 sm:p-8 md:p-12 rounded-lg shadow-lg">
          <header className="mb-8">
            <h1 className="text-3xl md:text-5xl font-bold font-headline text-primary mb-4">{post.title}</h1>
            <p className="text-muted-foreground">
              By {post.author} on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </header>
          <Image
            src={post.image.src}
            alt={post.title}
            width={800}
            height={400}
            className="w-full rounded-lg mb-8 object-cover max-h-[500px]"
            data-ai-hint={post.image.hint}
          />
          <div 
            className="text-lg space-y-6 text-foreground/90"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}
