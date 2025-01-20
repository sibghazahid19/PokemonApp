import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../../../core/res/theme/Colors';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: 'center',
    paddingTop: Platform.OS == 'ios' ? 50 : 40,
  },
  arrow: {
    height: 40,
    width: 40,
  },
  header: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: colors.loadingColor,
    marginTop: 8,
  },
  errorText: {
    fontSize: 16,
    color: colors.errorText,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.headerColor,
  },
  detailSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 12,
    backgroundColor: colors.whiteColor,
    padding: 12,
    borderRadius: 8,
    shadowColor: colors.blackColor,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textColor,
  },
  value: {
    fontSize: 18,
    color: '#555',
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  typeText: {
    fontSize: 16,
    color: colors.whiteColor,
    backgroundColor: colors.loadingColor,
    padding: 5,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
});
