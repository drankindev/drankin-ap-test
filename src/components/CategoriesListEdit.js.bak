import React, { useState, useEffect } from "react";
import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { generateClient } from "aws-amplify/api";
import { listCategories } from "../graphql/queries";
import {
    Button,
    Flex,
    Heading,
    Text,
    TextField,
    View
} from "@aws-amplify/ui-react";
import {
  createCategory as createCategoryMutation,
  deleteCategory as deleteCategoryMutation,
} from "../graphql/mutations";

Amplify.configure(awsconfig);
const client = generateClient();

const CategoriesListEdit = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const apiData = await client.graphql({ query: listCategories });
    const categoriesFromAPI = apiData.data.listCategories.items;
    setCategories(categoriesFromAPI);
  }

  async function createCategory(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      name: form.get("name"),
      description: form.get("description"),
    };
    await client.graphql({
      query: createCategoryMutation,
      variables: { input: data },
    });
    fetchCategories();
    event.target.reset();
  }

  async function deleteCategory({ id }) {
    const newCategories = categories.filter((category) => category.id !== id);
    setCategories(newCategories);
    await client.graphql({
      query: deleteCategoryMutation,
      variables: { input: { id } },
    });
  }

  return (
    <>
      <Heading level={1}>My Categories</Heading>
      <View as="form" margin="3rem 0" onSubmit={createCategory}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="name"
            placeholder="Category Name"
            label="Category Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="description"
            placeholder="Category Description"
            label="Category Description"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Create Category
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Current Categories</Heading>
      <View margin="3rem 0">
        {categories.map((category) => (
          <Flex
            key={category.id || category.name}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {category.name}
            </Text>
            <Text as="span">{category.description}</Text>
            <Button variation="link" onClick={() => deleteCategory(category)}>
              Delete category
            </Button>
          </Flex>
        ))}
      </View>

    </>
  );
};

export default CategoriesListEdit;