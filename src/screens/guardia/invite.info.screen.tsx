import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {validateInvite} from '../../requests/invite.requests';
import InviteInfo from './invite.info';

const InviteInfoScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [invite, setInvite] = useState(null);

  useEffect(() => {
    validateInvite(route.params)
      .then((response) => response.data)
      .then((invite) => {
        console.log(invite);
        setInvite(invite);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(`Error validating invite\n${error}`);
      });
  }, []);

  const close = () => navigation.jumpTo('Actividad');

  return (
    <SafeAreaView>
      {loading ? (
        <ActivityIndicator size="large" animating={true} />
      ) : invite && isInviteInfoValid(invite.info) ? (
        <InviteInfo invite={invite.info} guests={invite.guests} />
      ) : (
        <InvalidInviteScreen onOk={close} />
      )}
    </SafeAreaView>
  );
};

const isInviteInfoValid = (info) => {
  return info.enabled && new Date(info.exp) > new Date();
};

const InvalidInviteScreen = ({onOk}) => {
  return (
    <View>
      <Text h4>Invitacion Invalida!</Text>
      <Button type="clear" title="Ok" onPress={onOk} />
    </View>
  );
};

export default InviteInfoScreen;