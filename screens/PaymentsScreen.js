import { View, Text, SafeAreaView, ImageBackground } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import SafeViewAndroid from '../components/SafeViewAndroid';
import Transaction from '../components/Transaction';


const PaymentsScreen = () => {
  const dummyTransactions = [
    {
      status: "SUCCESSFUL",
      amount: 100.00,
      transactionId: "abcv",
      orderReference: "test01",
      merchantId: "PNR1000006",
      datetime: "2021-01-01 12:58:27",
    },
    {
      status: "SUCCESSFUL",
      amount: 100.00,
      transactionId: "dsfsdkl",
      orderReference: "test02",
      merchantId: "PNR1000006",
      datetime: "2021-01-01 12:58:26",
    },
    {
      status: "SUCCESSFUL",
      amount: 100.00,
      transactionId: "dsflkdsfl",
      orderReference: "test03",
      merchantId: "PNR1000006",
      datetime: "2021-01-01 12:58:25",
    },
  ]
  
  // const sortedData = dummyTransactions.sort((t1, t2) => {
  //   const d1 = Date.parse(t1.datetime);
  //   const d2 = Date.parse(t2.datetime);

  //   return d1 < d2;
  // })

  const sortLatest = (t1, t2) => {
    const d1 = Date.parse(t1.datetime);
    const d2 = Date.parse(t2.datetime);

    // Don't expect this to happen
    if (d1 == d2) {
      return t1.transactionId <= t2.transactionId
    }

    return d1 > d2;
  }



  return (
    <ImageBackground
      resizeMode='cover'
      className="flex-1 w-full h-full"
      source={require('../assets/yellow-bg.jpg')}
    >
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} className="flex-1">

        {/* Navbar */}
        <View className="flex-row items-end ml-2 mt-2">
          <Ionicons name="arrow-back" size={24} color="#5F5F5F" />
          <Text className="font-semibold text-lg text-[#5F5F5F] ml-2">Payments</Text>
        </View>

        {/* Payments */}
        <View className="p-5">
          <Text className="text-3xl text-[#309B0B]">$45.00</Text>
          <Text className="text-[#5F5F5F]">Your balance +12.0% from last month</Text>
        </View>

        {/* Transactions */}
        <View className="flex-1">
          { dummyTransactions.sort(sortLatest).map(t =>
            <Transaction 
              key={t.transactionId}
              transaction={t}
            />) 
          }

          {/* { dummyTransactions.map(transaction =>  <Transaction />) } */}
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default PaymentsScreen