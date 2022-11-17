<template>
    <div>
        <!-- :range="true" -->
        <!-- :autoRange="10" -->
        <DatepickerComponent monthNameFormat="long" locale="lt" utc :dark="true" :multiDates="true"
            :enableTimePicker="false" v-model="selectedDates">
        </DatepickerComponent>
    </div>
    <div class="container">
        Repeat every: <input class="container__frequency" type="number" min="1" v-model="period">
        <select v-model="selectedPeriodType" class="container__selected">
            <option data-day="day" selected>day</option>
            <option data-week="week">week</option>
            <option data-month="month">month</option>
            <option data-year="year">year</option>
        </select>

        <div class="container__selected-data">Frequincy: {{ period }}, Period: {{ selectedPeriodType }}</div>

        <template v-if="selectedPeriodType === 'week'">
            <div>
                <div>Reapeat on:</div>
                <template v-for="(day, index) in weekDays" :key="day">
                    <div>
                        <label :for="day">{{ index }} : {{ day }}</label>
                        <input type="checkbox" :id="day" :value="index" v-model="selectedDays">
                    </div>
                </template>
            </div>
        </template>






        <div>Ends:</div> 
        <DatepickerComponent monthNameFormat="long" locale="lt" utc :dark="true" :multiDates="false"
            :enableTimePicker="false" v-model="endDate">
        </DatepickerComponent>


    </div>


    <template v-for="date in selectedDates" :key="date">
        <div> Locale: {{ new Date(date) }}</div>
        <div>UTC: {{ date }}</div>
    </template>

    <button type="submit" @click="repeatDays(this.period, this.selectedDates, this.endDate)">Repeat {{ period }}
        Selected {{ selectedPeriodType }}</button>

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
            period: 1,
            selectedPeriodType: 'day',
            selectedDays: [],
            selectedDates: null,
            endDate: null,

            currentYearMonthDate: new Date(),
            currentHours: new Date().getHours(),
            currentMinutes: new Date().getMinutes(),
            currentSeconds: new Date().getSeconds(),

            newDates: [],
            currentYear: new Date().getFullYear(),
            currentMonth: new Date().getMonth(),
            currentDate: new Date().getDate(),
            currentDay: new Date().getDay(),
            monthsInYear: 12,
            weekDays: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            months: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ],

            daysInMonths: []

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

        getCurrentDay() {
            return this.weekDays[this.currentDayId];
        },

        daysInMonth(month, year) {
            return new Date(year, month, 0).getDate();
        },

        endOfMonth(month, year) {
            return new Date(year, month + 1, 0);
        },


        repeatDays(period, date, endDate) {

            // // init deadline, start, end
            let deadline = 0;
            let start = new Date(date[0]);
            let end = new Date(endDate);
            let thisMonthEnd = new Date(this.currentYear, this.currentMonth + 1, 0, this.currentHours, this.currentMinutes, 0);

            console.log('start date: ', start);
            console.log('end date: ', end);
            console.log('this month end: ', thisMonthEnd);

            if (endDate !== null) {
                deadline = (end - start) / 86400000; 
                console.log(deadline);
            } else {
                deadline = Math.ceil(thisMonthEnd - start) / 86400000;
                console.log(deadline);
            }




            // if (endDate !== null) {
            //     deadline = (end - start) / 86400000;
            // } else {
            //     end = this.endOfMonth(this.currentMonth, this.currentYear);

            //     deadline = (end - start) / 86400000;
            // }

            // // console.log(deadline);

            // let newDates = [JSON.parse(JSON.stringify(date[0]))];

            // let intervals = Math.round(deadline / period) + 1;


            // for (let i = 0; i < intervals; i++) {

            //     const newDate = new Date(newDates[newDates.length - 1]);

            //     if (newDate.getDate() + period <= new Date(this.currentYear, this.currentMonth + 1, 0).getDate()) {

            //         newDate.setDate(newDate.getDate() + period);

            //         newDates = [...newDates, newDate.toISOString()];

            //     }

            // }

            // this.selectedDates = [...newDates];
        },

        // repeatWeeks(period, date) {

        // },

        // repeat(period, date, periodType) {

        //     console.log(periodType);

        //     let length = date.length;
        //     let info = ''

        //     if (length === 1) {
        //         info = 'one';
        //     } 
            
        //     if (length > 1){
        //         info = 'more';
        //     }

        //     if (length === 0) {
        //         console.log('no selected dates');
        //     }

            

        //     switch (info) {
        //         case 'one': {
                    
        //             break;
        //         }
        //         case 'more':
        //             console.log('more than one date selected');
        //             break;

        //         default:
        //             break;
        //     }



        // },


        // repeat(period, interval, date) {

        //     const copy = JSON.parse(JSON.stringify(date));
        //     let newDates = [];
        //     newDates.push(copy);

        //     for (let i = 0; i < period; i++) {

        //         let last = newDates[newDates.length - 1];
        //         const newDate = new Date(last);

        //         newDate.setDate(newDate.getDate() + interval);
        //         newDates = [...newDates, newDate.toISOString()];

        //     }

        //     return newDates;

        // },

        // repeatMultiple(period, interval, dates, deadline) {
        //     let newDatesArray = [];

        //     for (let i = 0; i < dates.length; i++) {
        //         let newArray = this.repeat(period, interval, dates[i]);

        //         newDatesArray.push(...newArray);

        //         newDatesArray = newDatesArray.filter(el => deadline.getMonth() === new Date(el).getMonth());

        //     }

        //     this.dates = [...newDatesArray];
        //     return newDatesArray;
        // },

    },

    mounted() {
        for (let i = 0; i < this.monthsInYear; i++) {
            this.daysInMonths.push(
                {
                    month: this.months[i],
                    days: this.daysInMonth(i + 1, this.currentYear)
                }
            );
        }
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
.container {
    width: 25%;
    display: flex;
    flex-direction: column;

    .container__frequency {
        padding: 0.5rem;
    }

    .container__selected {
        padding: 0.5rem;
    }

    .container__selected-data {
        font-weight: 600;
        font-size: 1.25rem;
    }
}
</style>