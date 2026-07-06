import { getAllNewsAction } from "@/actions/newsActions";
import React from "react";
import AllNews from "./AllNews";
import Heading from "../shared/Heading";
import { ArrowNavigation } from "../shared/ArrowNavigation";

const NewsSection = async () => {
  const news = await getAllNewsAction();

  return <AllNews news={news.slice(0, 8)} heading={<Heading title="News for you" />} navigation={<ArrowNavigation id="news" />} swiper id="news" />;
};

export default NewsSection;
