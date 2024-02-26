"use client";
import DataListTable from "@/components/partials/table/DataListTable";
import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { dummy_data } from "@/app/(dashboard)/data";
import Rating from "@/components/partials/Rating";
import StarRatingComponent from "react-star-rating-component";
import { FaStar } from "react-icons/fa";
import moment from "moment";
import Card from "@/components/ui/Card";
import { getMovieSelector, getMoviesData, getGenerSelector, getGenerData, getFilterData, getFilterSelector } from "@/store/moviesstore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Textinput from "@/components/ui/Textinput";
import { Controller } from 'react-hook-form';
import Badge from "../ui/Badge";
import { useRouter } from 'next/router';
import Select, { components } from "react-select";
import PageLoader from "next/dist/client/page-loader";
console.log("dummy_data", dummy_data);


const styles = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, opacity: "0.5" } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, color: "#626262", paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
};



const TABLE_COLUMNS = [
  {
    Header: "Date",
    accessor: "date",
  },
  // {
  //   Header: "Poster",
  //   accessor: "poster",
  //   Cell: ({ cell: { value } }) => (
  //     <img src={value} alt="Poster" style={{ width: "50px", height: "auto" }} />
  //   ),
  // },
  {
    Header: "Poster",
    accessor: "poster",
    Cell: ({ cell: { value } }) => (
      <>
        {value && value !== "N/A" ? (
          <img src={value} alt="Poster" style={{ width: "50px", height: "auto" }} />
        ) : (
          <img src="/assets/images/users/noimage1.jpg" alt="No Poster" style={{ width: "50px", height: "auto" }} />
        )}
      </>
    ),
  },
  {
    Header: "Movie Title",
    accessor: "title",
  },
  {
    Header: "Genre(s)",
    accessor: "genres",
  },
  {
    Header: "Rating",
    accessor: "rating",
  },
  {
    Header: "Year Release",
    accessor: "yearRelease",
  },
  {
    Header: "Metacritic Rating",
    accessor: "metacriticRating",
  },
  {
    Header: "Runtime",
    accessor: "runtime",
  },
];

const All = () => {


  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const [selectedfilters, setSelectdfilter] = useState([]);
  const [selectedname, setselectedname] = useState([]);
  const [loader1, setLoader1] = useState(true);
  const [movieData, setMovieData] = useState([]);
  const [generData, setGenerData] = useState([]);
  const getGenerDataSelector = useSelector(getGenerSelector);
  const getMovieDataSelector = useSelector(getMovieSelector);
  const getFilterDataSelector = useSelector(getFilterSelector);

  useEffect(() => {
    dispatch(getMoviesData(setLoader));
    dispatch(getGenerData(setLoader1));

  }, []);
  console.log("generData", generData)
  useEffect(() => {
    if (getGenerDataSelector) {
      setGenerData(getGenerDataSelector);
    }
  }, [getGenerDataSelector]);

  useEffect(() => {
    if (getMovieDataSelector) {
      setMovieData(getMovieDataSelector);
    }
  }, [getMovieDataSelector]);


  useEffect(() => {
    if (getFilterDataSelector) {
      setMovieData(getFilterDataSelector);
    }
  }, [getFilterDataSelector])

  const TABLE_ROWS = movieData.flatMap((entry) => {

    const mainDate = moment(entry.date).format("YYYY MMM DD");
    // const mainDate = entry.date
    let isFirstMovie = true;
    return entry.movies.map((movie, movieIndex) => {
      const date = isFirstMovie ? mainDate : "";
      isFirstMovie = false;
      return {
        date,
        id: `${date}-${movieIndex}`,
        title: movie.title,
        poster: movie?.poster ? movie?.poster : "/assets/images/users/user-1.jpg",
        // genres: movie.genre ? movie.genre.map(genre => genre.name).join(", ") : "",
        genres: (
          <div>
            {movie.genre && movie.genre.map((genre, index) => (
              <Badge
                key={index} 
                label={genre.name}
                className="bg-primary-400 text-white mr-2 mb-2"
              />
            ))}
          </div>
        ),

        rating: (
          <div className="text-start" style={{ minWidth: "190px" }}>
            <StarRatingComponent
              name="rate2"
              editing={false}
              renderStarIcon={() => <FaStar />}
              starCount={10}
              value={movie.imdb_rating}
            />
          </div>
        ),
        yearRelease: movie.year,
        metacriticRating: movie.meta_score,
        runtime: movie.runtime,
      };
    });
  });


  const FormValidationSchema = yup.object({

  });

  const {
    reset,
    setValue,
    register,
    formState: { errors },
    handleSubmit,
    control
  } = useForm({
    resolver: yupResolver(FormValidationSchema),

  });


  const onSubmit = async (data, e) => {
    const selectedGenreIds = selectedfilters?.map(option => option.value);
    dispatch(getFilterData(setLoader, data.title, selectedGenreIds));
  };

  const handleRemoveFilter = () => {
    dispatch(getMoviesData(setLoader));
    setSelectdfilter([]);
    setselectedname([])
    console.log("movieData")
    setValue("title", null);
    setValue("geners", null);
    setValue("geners", []);
    reset();
  };


  const handleGroupChange = (selectedOptions) => {

    setSelectdfilter(selectedOptions)

  };

  useEffect(() => {
    console.log("selectedfilters", selectedfilters);
  }, [selectedfilters]);
  useEffect(() => {
    console.log("selectedfilters", selectedfilters);
  }, [movieData]);

  return (
    <>

      {/* <Card className="backdrop-blur-sm bg-white/30"> */}
        <Card  >
          <div className="space-y-4 mb-4 rounded-md">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="md:grid md:grid-cols-3 sm:block gap-5"
            >
              <div className="sm:w-full">
                <Textinput
                  name="title"
                  label="Movie title"
                  type="text"
                  register={register}
                  error={errors.companyname}
                  placeholder="Mission: Impossible – Fallout (2018)"
                  msgTooltip
                />
              </div>
              <div className="sm:w-full">
                <label className="form-label" htmlFor="mul_1">
                  Genres
                </label>
                <Select
                  name="geners"
                  isClearable={false}
                  defaultValue={[generData[0]]}
                  value={selectedfilters}
                  styles={styles}
                  isMulti
                  options={generData?.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                  isSearchable={true}
                  placeholder="Search options..."
                  register={register}
                  onChange={handleGroupChange}
                  className="react-select"
                  classNamePrefix="select"
                  id="mul_1"
                />
              </div>
              <div className="sm:w-full">
                
                <button className="h-12 px-4 rounded-md bg-primary-400  text-white dark:bg-black-900" style={{marginTop:"25px", marginRight:"5px", marginLeft:"10px"}} >
                  Search
                </button>
                <button
                  className="h-12 px-4 rounded-md bg-primary-400 text-white dark:bg-black-900 sm:mt-2"
                  onClick={handleRemoveFilter}
                  type="button" style={{marginTop:"25px", marginRight:"5px", marginLeft:"10px"}}
                >
                  Remove Filter
                </button>
              </div>
            </form>
          </div>
        </Card>
        <div className=" grid xl:grid-cols-2 grid-cols-1 gap-5">


        </div>
        {loader ? <div class='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
          <span class='sr-only'>Loading...</span>
          <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
          <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
          <div class='h-8 w-8 bg-black rounded-full animate-bounce'></div>
        </div> : TABLE_ROWS && TABLE_COLUMNS && (
          <DataListTable
            TABLE_COLUMNS={TABLE_COLUMNS}
            TABLE_ROWS={TABLE_ROWS}
            pageSize="5"

          ></DataListTable>

        )}
      {/* </Card> */}
    </>
  );
};

export default All;
