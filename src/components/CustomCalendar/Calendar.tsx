import {useState, useEffect} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import moment from 'moment';
import Date from './Date';
import {Block, Text} from '../index';
import {useTheme} from '../../hooks';

interface CalendarProps {
  onSelectDate: (date: moment.Moment | any) => void;
  selected: moment.Moment | any;
}

const Calendar: React.FC<CalendarProps> = ({onSelectDate, selected}) => {
  const [dates, setDates] = useState<moment.Moment[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentMonth, setCurrentMonth] = useState();
  const {colors} = useTheme();

  // get the dates from today to 10 days from now, format them as strings and store them in state
  const getDates = () => {
    const _dates = [];
    for (let i = 0; i < 10; i++) {
      const date = moment().add(i, 'days');
      _dates.push(date);
    }
    setDates(_dates);
  };

  useEffect(() => {
    getDates();
  }, []);

  return (
    <>
      <Block flex={0}>
        <Block flex={0}>
          <ScrollView
            contentContainerStyle={{paddingVertical: 10}}
            horizontal
            showsHorizontalScrollIndicator={false}>
            <Block flex={0} row justify="space-between">
              {dates.map((date, index) => (
                <Date
                  key={index}
                  date={date.toString()}
                  onSelectDate={onSelectDate}
                  selected={selected}
                />
              ))}
            </Block>
          </ScrollView>
        </Block>
      </Block>
    </>
  );
};

export default Calendar;
