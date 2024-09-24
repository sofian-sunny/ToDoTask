import {FC} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {useTheme} from '../../hooks';
import {Text, Block, Button} from '../index';

interface DateProps {
  date: string;
  onSelectDate: (date: string | any) => void;
  selected: string | any;
}

const Date: FC<DateProps> = ({date, onSelectDate, selected}) => {
  const {colors, fonts} = useTheme();
  /**
   * use moment to compare the date to today
   * if today, show 'Today'
   * if not today, show day of the week e.g 'Mon', 'Tue', 'Wed'
   */
  const day =
    moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
      ? 'Today'
      : moment(date).format('ddd');
  // get the day number e.g 1, 2, 3, 4, 5, 6, 7
  const dayNumber = moment(date).format('D');

  // get the full date e.g 2021-01-01 - we'll use this to compare the date to the selected date
  const fullDate = moment(date).format('YYYY-MM-DD');
  // console.log('selected Date', selected);

  return (
    <Button
      onPress={() => onSelectDate(fullDate)}
      style={[
        selected === fullDate && {borderColor: colors.primary, borderWidth: 1},
      ]}>
      <Block
        paddingHorizontal={10}
        height={50}
        justify="center"
        align="center"
        flex={0}>
        <Text
          lineHeight={20}
          font={fonts.bold}
          size={16}
          color={selected === fullDate ? colors.primary : colors.text}>
          {day}
        </Text>
        <Text
          lineHeight={20}
          font={fonts.bold}
          size={16}
          color={selected === fullDate ? colors.primary : colors.text}>
          {dayNumber}
        </Text>
      </Block>
    </Button>
  );
};

export default Date;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    height: 90,
    width: 80,
    marginHorizontal: 5,
  },
  big: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  medium: {
    fontSize: 16,
  },
});
