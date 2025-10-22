import HeroSection from "@/components/Home/HeroSection";
import DailyDealsSection from "@/components/Home/DailyDealsSection";
import FeaturedProductsSection from "@/components/Home/FeaturedProductsSection";
import CategoriesSection from "@/components/Home/CategoriesSection";
import TrendingProductsSection from "@/components/Home/TrendingProductsSection";
import BlogSection from "@/components/Home/BlogSection";
import PromotionalBannersSection from "@/components/Home/PromotionalBannersSection";
import PromotionalBanner from "@/components/Home/PromotionalBanner";

export default function HomePage() {
  return (
    <div className="container mx-auto">
      <HeroSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <PromotionalBanner/>
      <DailyDealsSection />
      <TrendingProductsSection />
      <PromotionalBannersSection/>
      <BlogSection />
    </div>
  );
}
