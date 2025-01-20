import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {useGetPokemonListQuery} from '../../../api/pokemonApi';
import {styles} from './styles';

import {StackScreenProps} from '@react-navigation/stack';
import {colors} from '../../../../core/res/theme/Colors';

type RootStackParamList = {
  PokemonList: undefined;
  PokemonDetail: {name: string};
};

type Props = StackScreenProps<RootStackParamList, 'PokemonList'>;

const PokemonListScreen: React.FC<Props> = ({navigation}) => {
  const {data: pokemonList, error, isLoading} = useGetPokemonListQuery();

  const rowColors = ['#d0f0fd', '#fffacd', '#d3f9d8', '#fde2e2', '#e2e8f0'];

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error fetching Pokémon list.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={colors.whiteColor}
        translucent={true}
      />

      <Text style={styles.header}>Pokémon List</Text>
      <FlatList
        data={pokemonList?.results || []}
        keyExtractor={item => item.name}
        renderItem={({item, index}) => (
          <TouchableOpacity
            testID={`pokemon-row-${index}`}
            style={[
              styles.row,
              {backgroundColor: rowColors[index % rowColors.length]},
            ]}
            onPress={() =>
              navigation.navigate('PokemonDetail', {name: item.name})
            }>
            <Image
              source={require('../../../../core/res/assets/icons/pokeball.png')}
              style={styles.avatar}
            />
            <Text style={styles.pokemonName}>{item.name.toUpperCase()}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PokemonListScreen;
