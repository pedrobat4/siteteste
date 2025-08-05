import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/lib/data';

export const metadata = {
  title: 'Blog - LexPro',
  description: 'Informative articles related to law from the experts at LexPro.',
};

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">LexPro Blog</h1>
        <p className="text-lg text-muted-foreground">Insights and analysis on the latest legal topics.</p>
      </header>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.slug} className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <Link href={`/blog/${post.slug}`} className="block">
              <Image 
                src={post.image.src}
                alt={post.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
                data-ai-hint={post.image.hint}
              />
            </Link>
            <CardHeader>
              <CardTitle className="font-headline text-xl h-16">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">{post.title}</Link>
              </CardTitle>
              <p className="text-sm text-muted-foreground pt-2">By {post.author} on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground mb-4">{post.excerpt}</p>
            </CardContent>
            <div className="p-6 pt-0">
              <Button asChild variant="link" className="p-0 text-accent">
                <Link href={`/blog/${post.slug}`}>Read More →</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
