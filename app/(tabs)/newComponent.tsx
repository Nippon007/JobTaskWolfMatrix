import { Image, StyleSheet, Platform } from 'react-native';
import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
// Item strictly typed
interface Item {
  id: string;
  name: string;
}


const newComponent = () => {

  // for the task used dummy data
  const data = [
    { id: "1", name: "Apple" },
    { id: "2", name: "Banana" },
    { id: "3", name: "Cherry" },
    { id: "4", name: "Date" },
    { id: "5", name: "Elderberry" },
  ];

  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [dataSource, setDataSource] = useState<Item[]>(data);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const inputRef = useRef<TextInput | null>(null);

  // code change to remove the multiple rerender issues 
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setDataSource(
        data.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) // taking into account the searchterm could be any case
        )
      );
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current); 
      }
    };
  }, [searchTerm, data]); // dependecy so that this runs when search term changes or the data is dynamically set again

  //handle select logic changed to fix the check the removal of items already selected on second click.
const handleSelect = (item:Item) => {
  setSelectedItems((currentSelectedItems) =>
    currentSelectedItems.some((selected) => selected.id === item.id)
      ? currentSelectedItems.filter((selected) => selected.id !== item.id) // Remove item if already selected
      : [...currentSelectedItems, item] // Add items if not selected
  );
};
  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.clear();
    }
    setSearchTerm(""); //searchTerm removed on clear
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
        keyExtractor={(item:any) => item.id}
        renderItem={({ item }:any) => (
          <TouchableOpacity onPress={() => handleSelect(item)}>
            <Text>{item.name}</Text>
            <Text>
  {selectedItems.some((selected) => selected.id === item.id)  // using id as unique key to check the selected and unselected items.
    ? "Selected"
    : "Not selected"}
</Text>

          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

export default newComponent;