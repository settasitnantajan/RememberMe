import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", // Changed back to white
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "black", // Text color for light background
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: "gray", // Standard border color for light theme
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    color: "black", // Text color for light theme
    backgroundColor: "white", // Background for light theme
  },
  list: {
    flex: 1,
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#eee", // Light border for light theme
    borderBottomWidth: 1,
  },
  todoTextContainer: {
    flex: 1,
  },
  todoText: {
    fontSize: 18,
    color: "black", // Standard text color
  },
  todoCompleted: {
    textDecorationLine: "line-through",
    color: "gray", // Standard completed text color
  },
  addButton: {
    backgroundColor: 'dodgerblue', // Or your preferred blue like '#007AFF'
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'crimson', // Or your preferred red like '#FF3B30'
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20, // เพิ่มความโค้งมนให้ปุ่มลบ
    marginLeft: 10, // ระยะห่างจากข้อความ To-Do
  },
  deleteButtonText: {
    color: '#FFFFFF', // สีตัวอักษรปุ่มลบ (ขาว)
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: 'mediumseagreen', // Or your preferred save color
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginLeft: 5,
  },
  cancelButton: {
    backgroundColor: 'lightslategrey', // Or your preferred cancel color
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginLeft: 5,
  },
  buttonText: { // General text style for Save/Cancel buttons
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: "red", // Standard error color
    textAlign: "center",
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 5,
    color: "gray",
    margin: 10,
  },
  listEmptyText: {
    color: "gray", // Standard empty list text color
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  appLoginIconContainer: { // Style for login icon on App.js
    position: 'absolute',
    top: 30, // Adjust as needed, considering the paddingTop of the main container
    right: 20,
    zIndex: 1, // Ensure it's above other elements if necessary
    padding: 5,
  }
});
