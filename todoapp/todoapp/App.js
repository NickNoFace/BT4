import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, CheckBox, Picker } from 'react-native';

function App() {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCompleted, setFilterCompleted] = useState("all");

  const handleAddTodo = () => {
    const newTodoId = todos.length + 1;
    setTodos([...todos, { id: newTodoId, name: "", completed: false }]);
  };

  const handleCompleteTodo = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const handleFilterChange = (filter) => {
    setFilterCompleted(filter);
  };

  const handleDeleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayTodos =
    filterCompleted === "all"
      ? filteredTodos
      : filterCompleted === "completed"
      ? filteredTodos.filter((todo) => todo.completed)
      : filteredTodos.filter((todo) => !todo.completed);

  return (
    <View style={styles.app}>
      <Text style={styles.heading}>TODO LIST</Text>
      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm..."
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <View style={styles.filterContainer}>
        <Picker
          style={styles.filterPicker}
          selectedValue={filterCompleted}
          onValueChange={(itemValue) => handleFilterChange(itemValue)}
        >
          <Picker.Item label="Tất cả" value="all" />
          <Picker.Item label="Đã hoàn thành" value="completed" />
          <Picker.Item label="Chưa hoàn thành" value="uncompleted" />
        </Picker>
      </View>
      <View style={styles.todoList}>
        {displayTodos.map((todo) => (
          <View key={todo.id} style={styles.todoItem}>
            <View style={styles.todoInputContainer}>
              <TextInput
                style={styles.todoInput}
                value={todo.name}
                onChangeText={(text) => {
                  const newTodos = todos.map((t) => {
                    if (t.id === todo.id) {
                      t.name = text;
                    }
                    return t;
                  });
                  setTodos(newTodos);
                }}
              />
            </View>
            <View style={styles.todoActions}>
              <CheckBox
                style={styles.todoActionsTick}
                value={todo.completed}
                onValueChange={() => handleCompleteTodo(todo.id)}
              />
              <Button
                title="X"
                onPress={() => handleDeleteTodo(todo.id)}
              />
            </View>
          </View>
        ))}
      </View>
      <Button title="Thêm" onPress={handleAddTodo} />
      <Text>Tác giả: Nguyễn Trọng Nghĩa</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    maxWidth: 600,
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    fontSize: 32,
  },
  input: {
    padding: 8,
    marginBottom: 8,
    width: '100%',
    fontSize: 28,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  filterPicker: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  todoList: {
    padding: 0,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 4,
  },
  todoInputContainer: {
    flex: 1,
    marginRight: 8,
  },
  todoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  todoActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoActionsTick: {
    margin: 15,
  },
});

export default App;
