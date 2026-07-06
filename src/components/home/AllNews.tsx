"use client";
import NewsCard from "../cards/NewsCard";
import { Prisma } from "@/generated/prisma/client";
import SwiperSlider from "@/swiper/SwiperSlider";
import { SwiperSlide } from "swiper/react";

type NewsWithCategory = Prisma.NewsGetPayload<{
  include: { category: true };
}>;

interface IProps {
  news: NewsWithCategory[];
  heading: React.ReactNode;
  navigation?: React.ReactNode;
  swiper?: boolean;
  id?: string;
}

const AllNews = ({ news, heading, navigation = "", swiper = false, id = "" }: IProps) => {
  return (
    <>
      {heading}
      <div className="flex justify-evenly flex-wrap gap-6 my-6">
        {swiper ? (
          <SwiperSlider id={id}>
            {news.map((news) => (
              <SwiperSlide key={news.id}>
                <NewsCard News={news} />
              </SwiperSlide>
            ))}
          </SwiperSlider>
        ) : (
          news.map((n) => <NewsCard key={n.id} News={n} />)
        )}
      </div>
      {navigation && navigation}
    </>
  );
};

export default AllNews;
