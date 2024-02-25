"use client";
import DataListTable from "@/components/partials/table/DataListTable";
import ExamapleOne from "@/components/partials/table/ExampleOne";
import CompanyTable from "@/components/partials/table/company-table";
import React, { useState } from "react";
import { dummy_data } from "./data";
import Rating from "@/components/partials/Rating";
import StarRatingComponent from "react-star-rating-component";
import { FaStar } from "react-icons/fa";
import moment from "moment";
import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";
import All from "@/components/pages/All";



const StarterPage = () => {
  return (
    <>
     
      <All></All>
    </>
  );
};

export default StarterPage;
