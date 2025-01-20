import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../../../core/res/theme/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
    paddingHorizontal: 10,
    paddingTop: Platform.OS == 'ios' ? 60 : 50,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.headerColor,
    textAlign: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 5,
    borderRadius: 6,
    shadowColor: colors.blackColor,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  pokemonName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textColor,
    textTransform: 'capitalize',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: colors.loadingColor,
  },
  errorText: {
    fontSize: 16,
    color: colors.errorText,
  },
});
