import React from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useGetPokemonDetailsQuery} from '../../../api/pokemonApi';
import {styles} from './styles';
import {colors} from '../../../../core/res/theme/Colors';

interface PokemonType {
  type: {name: string};
}

const PokemonDetailScreen: React.FC = ({navigation}) => {
  const route = useRoute();
  const {name} = route.params as {name: string};

  const {
    data: pokemonDetails,
    error,
    isLoading,
  } = useGetPokemonDetailsQuery(name);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          size="large"
          color={colors.loadingColor}
          testID="loading-spinner"
        />
        <Text style={styles.loadingText}>Loading Pokémon details...</Text>
      </View>
    );
  }

  if (error || !pokemonDetails) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error fetching Pokémon details.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.goBack()}>
        <Image
          source={require('../../../../core/res/assets/icons/left.png')}
          style={styles.arrow}
        />
        <Text style={styles.title}>{pokemonDetails.name.toUpperCase()}</Text>
        <View style={styles.arrow} />
      </TouchableOpacity>
      <Image
        source={require('../../../../core/res/assets/icons/pokeball.png')}
        style={styles.image}
      />

      <View style={styles.detailSection}>
        <Text style={styles.label}>Height:</Text>
        <Text style={styles.value}>{pokemonDetails.height} cm</Text>
      </View>

      <View style={styles.detailSection}>
        <Text style={styles.label}>Weight:</Text>
        <Text style={styles.value}>{pokemonDetails.weight} kg</Text>
      </View>

      <View style={styles.detailSection}>
        <Text style={styles.label}>Types:</Text>
        <View style={styles.typesContainer}>
          {pokemonDetails.types.map((typeItem: PokemonType, index: number) => (
            <Text key={index} style={styles.typeText}>
              {typeItem.type.name.toUpperCase()}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default PokemonDetailScreen;
