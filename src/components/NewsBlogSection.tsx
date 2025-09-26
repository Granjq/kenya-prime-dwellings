import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Nairobi Real Estate Market Hits New Highs in 2024",
    excerpt: "Property values in premium areas like Karen and Westlands continue to surge as demand outpaces supply in Kenya's capital city.",
    author: "Sarah Mwangi",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Market Analysis",
    image: "/api/placeholder/300/200"
  },
  {
    id: "2",
    title: "Investment Guide: Best Areas to Buy Property in Kenya",
    excerpt: "Discover the top locations offering the highest ROI for property investors, from emerging suburbs to established commercial districts.",
    author: "James Kariuki",
    date: "2024-01-12",
    readTime: "8 min read",
    category: "Investment",
    image: "/api/placeholder/300/200"
  },
  {
    id: "3",
    title: "The Rise of Short-Stay Rentals in Nairobi",
    excerpt: "How Airbnb and similar platforms are transforming the rental market and creating new opportunities for property owners.",
    author: "Grace Wanjiku",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Trends",
    image: "/api/placeholder/300/200"
  },
  {
    id: "4", 
    title: "Affordable Housing Initiative: What You Need to Know",
    excerpt: "Government's latest affordable housing program offers new pathways to homeownership for middle-income Kenyans.",
    author: "Peter Ochieng", 
    date: "2024-01-08",
    readTime: "7 min read",
    category: "Policy",
    image: "/api/placeholder/300/200"
  },
  {
    id: "5",
    title: "Sustainable Building Practices Gain Momentum",
    excerpt: "Green building technologies and eco-friendly materials are becoming the new standard in Kenya's construction industry.",
    author: "Mary Njeri",
    date: "2024-01-05",
    readTime: "4 min read", 
    category: "Sustainability",
    image: "/api/placeholder/300/200"
  },
  {
    id: "6",
    title: "Commercial Real Estate Outlook for 2024",
    excerpt: "Office spaces and retail properties show promising recovery as businesses adapt to post-pandemic market dynamics.",
    author: "David Mutua",
    date: "2024-01-03",
    readTime: "6 min read",
    category: "Commercial",
    image: "/api/placeholder/300/200"
  }
];

export function NewsBlogSection() {
  const isMobile = useIsMobile();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    });
  };

  const BlogCard = ({ post, index }: { post: BlogPost; index: number }) => (
    <Card 
      className="group hover:shadow-lg transition-all duration-300 cursor-pointer hover-scale animate-scale-in w-full"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <div className="text-4xl font-bold text-primary/40">
            {post.title.charAt(0)}
          </div>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {post.category}
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="w-3 h-3 mr-1" />
            {post.readTime}
          </div>
        </div>
        
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{formatDate(post.date)}</span>
            <span className="mx-2">•</span>
            <span>{post.author}</span>
          </div>
          
          <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Real Estate News & Insights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest trends, market analysis, and expert insights 
            in Kenya's real estate market.
          </p>
        </div>

        {isMobile ? (
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {mockBlogPosts.map((post, index) => (
                  <CarouselItem key={post.id} className="pl-2 md:pl-4 basis-4/5 sm:basis-3/4">
                    <BlogCard post={post} index={index} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockBlogPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        )}

        <div className="text-center mt-12 animate-fade-in">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}