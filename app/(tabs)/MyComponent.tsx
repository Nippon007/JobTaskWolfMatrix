import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";


/*
bugs and improvements
1.ensuring everything is strongly typed.Although the codes is in tsx no typing has been done .good typing could prevent runtime errors.
2.the useEffects that is setting Data source and doing filtering is causing multiple renders causing maxium depth exceeded error to occur due to setTimeout hence we debounce search input to avoid it.
3.the selection logic doesnt take the fact that selected items should be unselected on clicking again.
4..inlcudes uses object reference whereas .some uses some unique attribute like id so I prefer using .some for the seelcted or not selected feature
5.clear button or fucntion doesnt clear the search term 
6.the searching functionality doesnt take in to account that search terms could be lower or upper case.
*/



const MyComponent = () => {
  const data = [
    { id: "1", name: "Apple" },
    { id: "2", name: "Banana" },
    { id: "3", name: "Cherry" },
    { id: "4", name: "Date" },
    { id: "5", name: "Elderberry" },
  ];
  const [selectedItems, setSelectedItems] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    setDataSource(data);
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      setDataSource(data.filter((item) => item.name.includes(searchTerm)));
    }, 1000);
  }, [searchTerm,data]);

  const handleSelect = (item) => {
    setSelectedItems((currentSelectedItems) => [...currentSelectedItems, item]);
  };

  const handleClear = () => {
    inputRef.current.clear();
  };

  return (
    <View>
      <TextInput
        ref={inputRef}
        onChangeText={setSearchTerm}
        value={searchTerm}
      />
      <TouchableOpacity onPress={handleClear}>
        <Text>Clear</Text>
      </TouchableOpacity>
      <FlatList
        data={dataSource}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelect(item)}>
            <Text>{item.name}</Text>
            <Text>
              {selectedItems.includes(item) ? "Selected" : "Not selected"}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MyComponent;