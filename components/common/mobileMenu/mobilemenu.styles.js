import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  offcanvas: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 300,
    backgroundColor: '#2E2D4D',
    zIndex: 1,
    elevation: 3,
  },
  container: {
    flex: 1,
    backgroundColor: '#337357',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fafafa',
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#fafafa',
  },
  menuList: {
    flexGrow: 1,
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 8,
    color: '#fafafa',
  },
});

export default styles;
