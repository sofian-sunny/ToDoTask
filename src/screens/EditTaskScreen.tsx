import * as React from 'react';
import {Block, Button, Image, Text, Input} from '../components';
import {NavigationProp} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Calendar from '../components/CustomCalendar/Calendar';
import moment from 'moment';
import {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addTodo} from '../redux/slice/todoSlice';
import {Controller, useForm} from 'react-hook-form';
import {useTheme} from '../hooks';

const EditTaskScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: NavigationProp<any>;
}) => {
  const {task} = route.params;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState('Medium');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [currentPicker, setCurrentPicker] = useState<'start' | 'end' | null>(
    null,
  ); // 'start' or 'end'
  const [selectedDate, setSelectedDate] = useState(
    task?.date ? moment(task.date).format('YYYY-MM-DD') : new Date(),
  );

  console.log('task task  task', task);

  const {colors, sizes, icons, fonts, gradients} = useTheme();
  const todos = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: task?.title ?? '',
      description: task?.description ?? '',
      date: new Date(task.date).getTime(),
      startTime: task.startTime ?? new Date().getTime(),
      endTime: task.endTime ?? new Date().getTime(),
      priority: task.priority ?? 'low',
      completed: task.completed ?? false,
    },
  });

  // console.log('todos ########## ', todos);

  // Show the date picker for the start date
  const showStartDatePicker = useCallback(() => {
    setCurrentPicker('start');
    setDatePickerVisibility(true);
  }, []);

  // Show the date picker for the end date
  const showEndDatePicker = useCallback(() => {
    setCurrentPicker('end');
    setDatePickerVisibility(true);
  }, []);

  // Hide the date picker
  const hideDatePicker = useCallback(() => {
    setDatePickerVisibility(false);
  }, []);

  // Handle the selected date (for both start and end)
  const handleConfirm = useCallback(
    (date: Date, onChange: (date: Date) => void) => {
      if (currentPicker === 'start') {
        setStartTime(date); // Set the start date
        setValue('startTime', moment(date).valueOf());
      } else if (currentPicker === 'end') {
        setValue('endTime', moment(date).valueOf());
        setEndTime(date); // Set the end date
      }
      // onChange(date); // Pass the date back to the form field
      hideDatePicker(); // Hide the date picker after confirming
    },
    [currentPicker, hideDatePicker],
  );

  const generateUniqueId = () => {
    return (
      Date.now().toString() +
      Math.random().toString(36).substring(2, 4).toUpperCase()
    );
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    const id = await generateUniqueId();
    console.log('id', id);

    dispatch(
      addTodo({
        id: id,
        title: data.title,
        description: data.description,
        date: moment(selectedDate).valueOf(),
        startTime: data.startTime,
        endTime: data.endTime,
        priority: data.priority,
        completed: false,
      }),
    );
    navigation.goBack();
  };

  const onSelectDate = (date: string) => {
    console.log('onSelectDate date', moment(date).format('YYYY-MM-DD'));
    setSelectedDate(moment(date).format('YYYY-MM-DD'));
  };

  const renderPriorityBtn = (
    borderColor: string[] | any,
    title: string,
    style?: any,
  ) => {
    return (
      <Controller
        control={control}
        name="priority"
        render={({field: {onChange, value}}) => (
          <Button
            flex={1}
            gradient={borderColor}
            color={colors.card}
            style={style ?? {}}
            onPress={() => {
              onChange(title);
              setSelectedPriority(title);
            }}>
            <Block
              margin={1}
              radius={sizes.buttonRadius}
              color={selectedPriority != title ? colors.card : colors.primary}
              row
              center
              align="center">
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                }}
                font={fonts.medium}
                size={sizes.h4}
                lineHeight={sizes.h3}
                color={colors.white}>
                {title}
              </Text>
            </Block>
          </Button>
        )}
      />
    );
  };

  return (
    <Block safe color={colors.background}>
      <Block padding={sizes.padding}>
        <Block>
          <Block flex={0} row align="center">
            <Button
              height={17}
              align="flex-start"
              width={10}
              style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}
              onPress={() => navigation.goBack()}>
              <Image source={icons.back} />
            </Button>
            <Block>
              <Text center h1>
                Create new task
              </Text>
            </Block>
          </Block>
          <Block flex={0} marginTop={10} row justify="space-between">
            <Button align="flex-start">
              <Image source={icons.left_arrow} />
            </Button>
            <Block flex={0} justify="center">
              <Text h5 color={colors.primary}>
                {`${moment(selectedDate).format('DD MMM')} - `}
                {`${moment(selectedDate).add(7, 'days').format('DD MMM')}`}
              </Text>
            </Block>
            <Button align="flex-end">
              <Image source={icons.right_arrow} />
            </Button>
          </Block>
          <Calendar onSelectDate={onSelectDate} selected={selectedDate} />
          <Block flex={0} marginTop={20}>
            <Text white h3 marginTop={20}>
              Schedule
            </Text>
            <Block flex={0} marginTop={20}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    white
                    inputBoxborderWidth={0}
                    placeholder="Name"
                    inputBoxBgColor={colors.card}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="title"
              />
              {errors.title && <Text>This is required.</Text>}
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    white
                    marginTop={20}
                    inputBoxHeight={100}
                    inputBoxborderWidth={0}
                    inputBoxBgColor={colors.card}
                    placeholder="Description"
                    onChangeText={onChange}
                    value={value}
                    multiline={true}
                    numberOfLines={4}
                  />
                )}
                name="description"
              />
              {errors.description && <Text>This is required.</Text>}
            </Block>
            <Text white h4 marginTop={20} opacity={0.8}>
              Schedule
            </Text>
            <Block row flex={0} marginTop={10}>
              <Button
                onPress={() => showStartDatePicker()}
                marginRight={5}
                color={colors.card}
                flex={1}>
                <Block row center align="center">
                  <Image source={icons.time_icon} />
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <Text
                        font={fonts.normal}
                        size={sizes.h5}
                        lineHeight={sizes.h3}
                        color={colors.white}
                        opacity={0.8}
                        marginLeft={10}>
                        {value ? moment(value).format('hh:mm A') : 'Start'}
                      </Text>
                    )}
                    name="startTime"
                  />
                </Block>
              </Button>

              <Button
                onPress={() => showEndDatePicker()}
                marginLeft={5}
                color={colors.card}
                flex={1}>
                <Block row center align="center">
                  <Image source={icons.time_icon} />
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <Text
                        font={fonts.normal}
                        size={sizes.h5}
                        opacity={0.8}
                        lineHeight={sizes.h3}
                        color={colors.white}
                        marginLeft={10}>
                        {value ? moment(value).format('hh:mm A') : 'End'}
                      </Text>
                    )}
                    name="endTime"
                  />
                </Block>
              </Button>
            </Block>
            <Text white h4 marginTop={20} opacity={0.8}>
              Priority
            </Text>
            <Block row flex={0} marginTop={10}>
              {renderPriorityBtn(gradients.gold_white, 'High', {
                marginRight: 5,
              })}
              {renderPriorityBtn(gradients.lightblue_white, 'Medium', {
                marginLeft: 5,
              })}
              {renderPriorityBtn(gradients.primary_white, 'Low', {
                marginLeft: 10,
              })}
            </Block>
          </Block>
        </Block>
        <Block
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          flex={0}
          marginTop={20}
          paddingHorizontal={sizes.padding}>
          <Button gradient={gradients.primary} onPress={handleSubmit(onSubmit)}>
            <Text
              lineHeight={sizes.h3}
              white
              center
              font={fonts.medium}
              size={sizes.h6}>
              Edit Task
            </Text>
          </Button>
        </Block>
        <Controller
          control={control}
          name={currentPicker == 'start' ? 'startTime' : 'endTime'}
          render={({field: {onChange, value}}) => (
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="time"
              onCancel={hideDatePicker}
              onConfirm={date => handleConfirm(date, onChange)}
            />
          )}
        />
      </Block>
    </Block>
  );
};
export default EditTaskScreen;
