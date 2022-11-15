<template>
    <div>
        <!-- :range="true" -->
        <!-- :autoRange="10" -->
        <DatepickerComponent 
            monthNameFormat="long"
            locale="lt"
            utc
            :dark="true"
            :multiDates="true"
            :enableTimePicker="false"


            v-model="dates"
            >
        </DatepickerComponent>
    </div>

    <template v-for="date in dates" :key="date">
        <div> Locale: {{ new Date(date) }}</div>
        <div>UTC: {{ date }}</div>
    </template>

    <button type="submit" @click="repeatEveryWeek">Submit</button>
    <button type="submit" @click="repeat(4, 7, this.dates[0])">Repeat Weekly</button>
    <button type="submit" @click="repeatMultiple(8, 7, this.dates)">Repeat Weekly Multiple</button>
</template>

<script>
import DatepickerComponent from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
    name: 'App',
    component: { DatepickerComponent },
    props: {},


    data() {
        return {
            dates: null,
            newDates: [],
        }
    },

    methods: {
        repeatEveryWeek() {
            console.log(this.date);
            // this.loopDateArray();
            this.plusDay();
            this.plusMonth();
            this.plusYear();
        },
    plusDay() {
        let now = new Date();
        now.setDate(now.getDate() + 1);

        console.log('Next Day: ', new Date(now));
    },

    plusMonth() {
        let now = new Date();
        now.setMonth(now.getMonth() + 1);

        console.log('Next Month: ', new Date(now));
    },

    plusYear() {
        let now = new Date();
        now.setFullYear(now.getFullYear() + 1)
        // now.setDate(now.getFullYear());

        console.log('Next Year: ', new Date(now));
    },

    repeat(period, interval, date) {
        
        const copy = JSON.parse(JSON.stringify(date));
        let newDates = [];
        newDates.push(copy);

        for (let i = 0; i < period - 1; i++) {

            let last = newDates[newDates.length - 1];
            const newDate = new Date(last);

            newDate.setDate(newDate.getDate() + interval);
            newDates = [...newDates, newDate.toISOString()];

        }

        // this.dates = [...this.newDates];
        console.log(newDates);
        return newDates;

    },

    repeatMultiple(period, interval, dates) {
        const newDatesArray = [];

        for (let i = 0; i < dates.length; i++) {
            let newArray = this.repeat(period, interval, dates[i]);
            newDatesArray.push(...newArray); 
        }

        this.dates = [...newDatesArray];
        return newDatesArray;
    },

    },

}
</script>

<!-- class="dp__menu"
        id="picker"
        ref="datepicker"
        position="center"
        monthNameFormat="long"
        autoApply

        :closeOnAutoApply="true"
        :enableTimePicker="false"
        :locale="store.state.general.locale"

        v-model="date"
        @update:modelValue="changeDate"
        @open="opened"
        @closed="closed" -->


<style lang="scss">



</style>