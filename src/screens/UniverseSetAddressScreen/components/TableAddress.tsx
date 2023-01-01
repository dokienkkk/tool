import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import type {FC} from 'react';
import React from 'react';
import shareStyles from 'src/styles';
import DeleteIcon from 'src/icons/DeleteIcon';
import Colors from 'src/styles/Colors';

export const TABLE_CONFIG = [
  {
    label: 'STT',
    width: '20%',
  },
  {
    label: 'Địa chỉ',
    width: '20%',
  },
  {
    label: 'Loại thiết bị',
    width: '50%',
  },
  {
    label: '',
    width: '10%',
  },
];

interface TableAddressProps {}

const mockData = [1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1];

const TableAddress: FC<TableAddressProps> = () => {
  const renderItem = React.useCallback(
    () => (
      <>
        <View style={[styles.tRow, styles.bgWhite, styles.borderBottom]}>
          <Text
            style={[
              shareStyles.textRegular,
              styles.tData,
              {width: TABLE_CONFIG[0].width},
            ]}>
            01
          </Text>
          <Text
            style={[
              shareStyles.textRegular,
              styles.tData,
              {width: TABLE_CONFIG[1].width},
            ]}>
            01
          </Text>
          <Text
            style={[
              shareStyles.textRegular,
              styles.tData,
              {width: TABLE_CONFIG[2].width},
            ]}>
            Đèn RGB
          </Text>
          <Text
            style={[
              shareStyles.textRegular,
              styles.tData,
              {
                width: TABLE_CONFIG[3].width,
              },
            ]}>
            <TouchableOpacity>
              <DeleteIcon />
            </TouchableOpacity>
          </Text>
        </View>
        {/* <Dash
          dashThickness={0.5}
          dashGap={1}
          dashLength={3}
          dashColor={Colors.blue}
        /> */}
      </>
    ),
    [],
  );
  return (
    <View style={styles.flex1}>
      <View style={[styles.tRow, styles.bgBlue, styles.borderTop]}>
        {TABLE_CONFIG.map((header, indexHeader) => (
          <Text
            key={indexHeader}
            style={[shareStyles.textBold, styles.tHead, {width: header.width}]}>
            {header.label}
          </Text>
        ))}
      </View>
      <FlatList
        data={mockData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    paddingHorizontal: 4,
  },
  tData: {
    fontSize: 16,
    lineHeight: 16,
    color: Colors.black,
    textAlign: 'center',
  },
  tHead: {
    fontSize: 16,
    lineHeight: 16,
    color: Colors.white,
    textAlign: 'center',
  },
  bgWhite: {
    backgroundColor: Colors.white,
  },
  bgBlue: {
    backgroundColor: Colors.blue,
  },
  borderTop: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  flex1: {
    flex: 1,
    paddingTop: 12,
  },
  borderBottom: {
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
});

export default TableAddress;
