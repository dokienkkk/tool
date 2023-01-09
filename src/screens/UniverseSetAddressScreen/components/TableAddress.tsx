import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import type {FC} from 'react';
import React from 'react';
import shareStyles from 'src/styles';
import DeleteIcon from 'src/icons/DeleteIcon';
import Colors from 'src/styles/Colors';
import {addressService} from 'src/services/address-service';
import {globalState} from 'src/app/global-state';
import type {Address} from 'src/database/model';
import {renderNameDevice} from 'src/config/device';
import CustomModal from 'src/components/CustomModal/CustomModal';
import {useBoolean} from 'src/hooks/use-boolean';
import {useTranslation} from 'react-i18next';

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

const TableAddress: FC<TableAddressProps> = () => {
  const [currentUniverse] = globalState.useUniverse();

  const [listAddress] = addressService.useAddress(currentUniverse);

  const [translate] = useTranslation();

  const [isVisible, , openModal, closeModal] = useBoolean(false);

  const [text, setText] = React.useState('Bạn có chắc muốn xóa không ?');

  const [id, setId] = React.useState('');

  const [, , deleteAddress] = addressService.useAddress(currentUniverse);

  const handleConfirmDelete = React.useCallback(
    (item: Partial<Address>) => {
      setId(item.id);
      setText(`Xóa địa chỉ ${item.addressId} ?`);
      openModal();
    },
    [openModal],
  );

  const handleDeleteAddress = React.useCallback(async () => {
    await deleteAddress({id});
    closeModal();
  }, [closeModal, deleteAddress, id]);

  const renderItem = React.useCallback(
    ({item}: {item: Partial<Address>}) => (
      <>
        <View style={[styles.tRow, styles.bgWhite, styles.borderBottom]}>
          <Text
            style={[
              shareStyles.textRegular,
              styles.tData,
              {width: TABLE_CONFIG[0].width},
            ]}>
            {item.order}
          </Text>
          <Text
            style={[
              shareStyles.textRegular,
              styles.tData,
              {width: TABLE_CONFIG[1].width},
            ]}>
            {item.addressId}
          </Text>
          <Text
            style={[
              shareStyles.textRegular,
              styles.tData,
              {width: TABLE_CONFIG[2].width},
            ]}>
            {renderNameDevice(item.deviceType)}
          </Text>
          <Text
            style={[
              shareStyles.textRegular,
              styles.tData,
              {
                width: TABLE_CONFIG[3].width,
              },
            ]}>
            <TouchableOpacity onPress={() => handleConfirmDelete(item)}>
              <DeleteIcon />
            </TouchableOpacity>
          </Text>
        </View>
      </>
    ),
    [handleConfirmDelete],
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
        data={listAddress}
        renderItem={renderItem}
        extraData={listAddress}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
      <CustomModal
        isVisible={isVisible}
        title={translate('action.confirm')}
        onBackdropPress={closeModal}
        labelPrimary={translate('action.delete')}
        labelSecondary={translate('action.cancel')}
        onPressSecondary={closeModal}
        onPressPrimary={handleDeleteAddress}>
        <View>
          <Text style={[shareStyles.textBold, styles.textModal]}>{text}</Text>
        </View>
      </CustomModal>
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
  textModal: {
    fontSize: 16,
    color: Colors.black,
    textAlign: 'center',
    padding: 12,
  },
});

export default TableAddress;
