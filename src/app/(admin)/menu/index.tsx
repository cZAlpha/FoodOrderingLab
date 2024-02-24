import { FlatList } from 'react-native'; // The importation of FlatList allows us to show a list of rendered ProductListItem components
import products from '@assets/data/products'; // Importing the list of products from preexisting asset files
import ProductListItem from '@components/ProductListItem'; // Importing a component that show the product pic, name, and price among other things

export default function MenuScreen() { // function that is the menu screen flatlist containing the list of products
  return (
    <FlatList // Flatlist implementation
      data = {products} // the data for the items in the flatlist comes from an import
      renderItem = { ({ item }) => <ProductListItem product={item} /> } // renders the given ProdutListItem component
      numColumns={2} // Specifies that there are to be two columns of items within the flatlist
      contentContainerStyle={{ gap: 10, padding: 10 }} // styling: gap of 10px, padding of 10px with reference to the content within the container that is the flatlist
      columnWrapperStyle={{ gap: 10 }} // styling: gap of 10px between column
    />
  );
}


