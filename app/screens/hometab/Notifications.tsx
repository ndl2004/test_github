import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons'; // Import thư viện icon

const Notifications = () => {
  // Dữ liệu thông báo mẫu với icon
  const notifications = [
    { id: '1', message: 'Bạn có một thông báo mới từ hệ thống.', icon: 'notifications-outline' },
    { id: '2', message: 'Đã cập nhật thông tin sản phẩm.', icon: 'checkmark-circle-outline' },
    { id: '3', message: 'Khuyến mãi đặc biệt chỉ hôm nay!', icon: 'star-outline' },
    { id: '4', message: 'Hẹn gặp lại bạn trong ngày hội sắp tới.', icon: 'calendar-outline' },
    { id: '5', message: 'Đã gửi đơn hàng của bạn thành công.', icon: 'cart-outline' },
  ];

  const handleNotificationPress = (message: string) => {
    Alert.alert('Thông báo', message);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thông Báo</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.notificationItem}
            onPress={() => handleNotificationPress(item.message)}
          >
            <Icon name={item.icon} size={24} color="#4CAF50" style={styles.icon} />
            <Text style={styles.notificationText}>{item.message}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
      {/* Thêm GIF ở dưới cùng */}
      <Image
        source={{ uri: 'https://media.giphy.com/media/3oKIPt3v7uKto6c7dK/giphy.gif' }} // Đường dẫn đến GIF chúc mừng
        style={styles.gif}
        resizeMode="contain"
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f5e9', // Màu nền nhẹ nhàng
    padding: 20,
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20, // Khoảng cách dưới cùng của danh sách
  },
  notificationItem: {
    backgroundColor: '#ffffff', // Nền trắng cho thông báo
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000', // Thêm bóng đổ
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Để tạo bóng trên Android
    flexDirection: 'row', // Để icon và text hiển thị ngang
    alignItems: 'center', // Căn giữa theo chiều dọc
  },
  icon: {
    marginRight: 10, // Khoảng cách giữa icon và text
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24, // Khoảng cách giữa các dòng
    flex: 1, // Cho phép text chiếm không gian còn lại
  },
  gif: {
    width: '100%', // Chiếm toàn bộ chiều rộng
    height: 200, // Chiều cao cố định cho GIF
    marginTop: 20, // Khoảng cách trên
    borderRadius: 10, // Bo góc cho GIF
  },
});
