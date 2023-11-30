import React, { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import { listCategories } from "../graphql/queries";
import { Link, useLocation } from 'react-router-dom';

const client = generateClient();

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const apiData = await client.graphql({ query: listCategories });
    console.log(apiData);
    const categoriesFromAPI = apiData.data.listCategories.items;
    setCategories(categoriesFromAPI);
  }

  return (
    <>
      <h3 className="font-bebas text-2xl text-red-700 font-bold">Topics</h3>
      {categories &&
      <ul>
        {categories.sort((a, b) => a.name > b.name ? 1 : -1).map((category) => {

          let path = '/posts/' + category.name.toLowerCase().trim().replace(/[^A-Za-z0-9 -]/g, '-')
          
          return(<li key={category.name} className="list-none">
            <Link className={`font-bold font-roboto hover:text-red-700 ${location.pathname === path ? 'text-red-700' : ''}`} to={path}>
              {category.name}
            </Link>
          </li>)

        })}
      </ul>
      }
    </>
  );
};

export default CategoriesList;