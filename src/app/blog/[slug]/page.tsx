
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/lib/data';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

  const relatedPosts = blogPosts.filter((p) => p.slug !== params.slug).slice(0, 3);

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

        {/* Related Posts */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold font-headline text-primary mb-8 text-center">Related Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Card key={relatedPost.slug} className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <Link href={`/blog/${relatedPost.slug}`} className="block">
                  <Image
                    src={relatedPost.image.src}
                    alt={relatedPost.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                    data-ai-hint={relatedPost.image.hint}
                  />
                </Link>
                <CardHeader>
                  <CardTitle className="font-headline text-xl h-16">
                    <Link href={`/blog/${relatedPost.slug}`} className="hover:text-primary transition-colors">{relatedPost.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4">{relatedPost.excerpt}</p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild variant="link" className="p-0 text-accent">
                    <Link href={`/blog/${relatedPost.slug}`}>Read More →</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}
