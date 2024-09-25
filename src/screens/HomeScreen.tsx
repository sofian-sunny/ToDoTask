import React, {useEffect} from 'react';
import * as Progress from 'react-native-progress';
import {Block, Button, Checkbox, Image, Modal, Text} from '../components';
import {FONTS, width} from '../constants/theme';
import {useTheme} from '../hooks';
import {setTodoStatus} from '../redux/slice/todoSlice';
import {MainRoutes} from '../navigation/StackNavigation';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationProp} from '@react-navigation/native';
import {Pressable} from 'react-native';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';
import {ITask} from '../constants/types';

interface HomeScreenProps {
  navigation: NavigationProp<any>;
}

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const {colors, gradients, icons, sizes, fonts} = useTheme();
  const todos = useSelector((state: any) => state);
  const [modal, setModal] = React.useState<boolean>(false);
  const [taskDetails, setTaskDetails] = React.useState<any>({
    tasks: 0,
    completed: 0,
  });
  const [currentSelectedTask, setCurrentSelectedTask] = React.useState<ITask>();
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log('todos =============', todos);
    setTaskDetails(tasksDetails());
  }, [todos?.todos?.todos]);
  const renderFloatingBtn = (navigation: NavigationProp<any>) => {
    return (
      <Button
        onPress={() => navigation.navigate(MainRoutes.CreateTaskScreen)}
        position="absolute"
        right={10}
        bottom={30}
        style={{zIndex: 10}}
        width={70}
        height={70}
        radius={35}
        justify="center"
        align="center"
        gradient={gradients.primary}>
        <Image
          tintColor={colors.white}
          height={24}
          width={24}
          source={icons.plus}
        />
      </Button>
    );
  };

  const tasksDetails = () => {
    if (todos?.todos?.todos?.length === 0) {
      return {tasks: 0, completed: 0};
    } else {
      let completed = 0;
      todos?.todos?.todos?.forEach((task: ITask) => {
        if (task.completed) {
          completed++;
        }
      });
      return {tasks: todos?.todos?.todos?.length, completed};
    }
  };

  console.log('todos =============', todos?.todos?.todos);

  const onCheckBoxPress = (task: ITask) => {
    setCurrentSelectedTask(task);
    setModal(true);
  };

  const onCompleteTask = (value: boolean) => {
    dispatch(
      setTodoStatus({
        ...currentSelectedTask,
        completed: value,
      }),
    );
    setModal(false);
  };

  // console.log('todos =============', todos?.todos?.todos);
  const renderTask = () => {
    if (!todos?.todos?.todos || todos?.todos?.todos?.length === 0) {
      return null;
    }
    return (
      Array.isArray(todos?.todos?.todos) &&
      todos?.todos?.todos?.map((todoItem: ITask, index: number) => {
        let gradient = gradients.gold_white;
        if (todoItem.priority === 'Low') {
          gradient = gradients.primary_white;
        } else if (todoItem.priority === 'Medium') {
          gradient = gradients.lightblue_white;
        }
        return (
          <Pressable
            key={`${todoItem.id}`}
            onPress={() =>
              navigation.navigate(MainRoutes.EditTaskScreen, {task: todoItem})
            }>
            <Block
              flex={0}
              row
              marginTop={sizes.sm}
              radius={sizes.cardRadius}
              align="center"
              color={colors.card}>
              <Block
                flex={0}
                style={{
                  borderTopLeftRadius: sizes.cardRadius,
                  borderBottomLeftRadius: sizes.cardRadius,
                }}
                height={80}
                width={15}
                gradient={gradient}
              />
              <Block padding={sizes.cardPadding} justify="center">
                <Text white h6>
                  {`${todoItem.title}`}
                </Text>
                <Block align="center" flex={0} row marginTop={10}>
                  <Image
                    tintColor={colors.white}
                    height={24}
                    width={24}
                    source={icons.calendar}
                  />
                  <Text opacity={0.8} white p marginLeft={10}>
                    {`${moment(todoItem.date).format('DD MMM')}`}
                  </Text>
                </Block>
              </Block>
              <Checkbox
                onPress={() => onCheckBoxPress(todoItem)}
                margin={sizes.cardPadding}
                checked={todoItem.completed}
              />
            </Block>
          </Pressable>
        );
      })
    );
  };

  console.log('taskDetails?.completed', taskDetails?.completed);
  console.log('taskDetails?.tasks', taskDetails?.tasks);

  return (
    <Block safe color={colors.background}>
      {renderFloatingBtn(navigation)}
      <Block margin={sizes.padding}>
        <Block row align="center" flex={0} justify="space-between">
          <Block>
            <Text white h1 marginRight={10}>
              {`You have got ${taskDetails.tasks} tasks today to complete `}
              <Image height={24} width={24} source={icons.edit} />
            </Text>
          </Block>
          <Block
            flex={0}
            width={50}
            height={50}
            radius={25}
            justify="center"
            align="center"
            gradient={gradients.primary}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}>
            <Image avatar source={icons.profile} />
          </Block>
        </Block>
        <Block
          marginTop={30}
          row
          align="center"
          flex={0}
          justify="space-between">
          <Text white h3 style={{letterSpacing: -0.5}}>
            Progress
          </Text>
          <Text white h6 color={colors.primary}>
            See All
          </Text>
        </Block>
        <Block
          flex={0}
          marginTop={sizes.sm}
          padding={sizes.cardPadding}
          radius={sizes.cardRadius}
          color={colors.card}>
          <Text white h5>
            Progress
          </Text>
          <Text opacity={0.8} marginTop={10} white h6>
            {`${taskDetails?.completed} / ${taskDetails.tasks}`} Task Completed
          </Text>
          <Block
            marginTop={10}
            row
            align="center"
            flex={0}
            justify="space-between">
            <Text opacity={0.8} white p font={FONTS.thin}>
              {taskDetails?.tasks > 0
                ? 'You are almost done go ahead'
                : 'You have no task to complete'}
            </Text>
            <Text white h5>
              {taskDetails?.completed > 0
                ? (taskDetails?.completed / taskDetails.tasks) * 100
                : 0}
              %
            </Text>
          </Block>
          <Progress.Bar
            color={colors.primary}
            unfilledColor={'rgba(186, 131, 222, 0.4)'}
            style={{marginTop: 10, borderRadius: 10}}
            height={18}
            borderWidth={0}
            progress={
              taskDetails?.completed
                ? taskDetails?.completed / taskDetails?.tasks
                : 0
            }
            width={width - 40 - 32}
          />
        </Block>
        <Block
          marginTop={30}
          row
          align="center"
          flex={0}
          justify="space-between">
          <Text white h3>
          Tasks
          </Text>
          <Text white h6 color={colors.primary}>
            See All
          </Text>
        </Block>
        {Array.isArray(todos?.todos?.todos) && (
          <ScrollView>{renderTask()}</ScrollView>
        )}
      </Block>
      <Modal visible={modal} onRequestClose={() => setModal(false)}>
        <Block flex={0}>
          <Text black h3>
            Are you sure you want to change status of this task?
          </Text>
          <Block row justify="space-between" flex={0} marginTop={20}>
            <Button
              onPress={() => onCompleteTask(false)}
              marginRight={10}
              color={colors.background}
              flex={1}>
              <Block flex={0} row center align="center">
                <Text
                  font={fonts.normal}
                  size={sizes.h5}
                  lineHeight={sizes.h3}
                  color={colors.white}
                  opacity={0.8}
                  marginLeft={10}>
                  Cancel
                </Text>
              </Block>
            </Button>
            <Button
              onPress={() => onCompleteTask(true)}
              marginLeft={10}
              gradient={gradients.primary}
              flex={1}>
              <Block row center align="center">
                <Text
                  font={fonts.normal}
                  size={sizes.h5}
                  lineHeight={sizes.h3}
                  color={colors.white}
                  opacity={0.8}
                  marginLeft={10}>
                  Confirm
                </Text>
              </Block>
            </Button>
          </Block>
        </Block>
      </Modal>
    </Block>
  );
};
export default HomeScreen;
