<template>
    <div>今天，想來一杯...</div>
    <!-- {{ selectedStores }} -->
    <n-space vertical>
        <n-select
            v-model:value="selectedStores"
            filterable
            placeholder="請選擇店家"
            :options="storeList"
        />
    </n-space>

    <div v-for="store in selectedStoresDetail" :key="store.name">
        <div>店家名稱：{{ store.name }}</div>
        <div>地點：{{ store.location }}</div>
        <div>聯繫方式：{{ store.contact }}</div>
        <div>外送金額：{{ store.deliveryAmount }}</div>
        <br>
    </div>
</template>

<script setup>
    // import { BicycleOutline } from "@vicons/ionicons5";
    import { ref, onMounted, watch, computed } from 'vue'
    import { NSelect, NSpace } from 'naive-ui'
    import axios from 'axios'

    const url = `https://sheets.googleapis.com/v4/spreadsheets`;
    const docID = import.meta.env.VITE_SHEET_ID;
    const apiKey = import.meta.env.VITE_API_KEY;

    const selectedStores = ref('');
    const storeList = ref([]);
    const storeDetail = ref([]);

    onMounted(() => {
        getStoreList()
    })

    const transformArrayToObject = (arr) => {
        return arr.map((item) => {           
            return {
                label: item[0],
                value: item[0]
            }
        })
    }

    const transformSheetDataToJson = (sheetData) => {
        const name = sheetData[0];
        return sheetData.slice(1).map(item => {
            const returnJson = {};
            for (let i = 0; i < name.length; i++) {
                returnJson[name[i]] = item[i] || '';
            }
            return returnJson;
        });
    }

    const getStoreList = () => {
        axios.get(url + `/${docID}/values/storeInfo!A:D`, {
            params: {key: apiKey}
        })
        .then(function (res) {
            storeList.value = [
                { label: "全部", value: "" },
                ...transformArrayToObject(res.data.values).slice(1)
            ];
            storeDetail.value = transformSheetDataToJson(res.data.values);
            console.log('storeDetail', storeDetail.value);
        })
        .catch((error) => console.log(error))
    }

    const selectedStoresDetail = computed(() => {
        if (!selectedStores.value || !selectedStores.value.length) {
            return storeDetail.value;
        }

        return storeDetail.value.filter(order => order.name === selectedStores.value);
    });


</script>

<style></style>