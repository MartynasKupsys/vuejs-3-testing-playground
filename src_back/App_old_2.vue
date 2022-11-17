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
            :modelValue="selectedDates" @update:modelValue="selectDate($event)"
            :disabledDates="(date) => date < this.currentYearMonthDate"
            
        >
        </DatepickerComponent>
        <!-- :modelValue="selectedDates" @update:modelValue="selectDate($event)" -->
        <!-- v-model="selectedDates" -->
    </div>
    <div class="container">
        Repeat every:
        <input
            class="container__frequency"
            type="number"
            min="1"
            v-model="period"
        />
        <select v-model="selectedPeriodType" class="container__selected">
            <option data-day="day" selected>day</option>
            <option data-week="week">week</option>
            <option data-month="month">month</option>
            <option data-year="year">year</option>
        </select>

        <div class="container__selected-data">
            Frequency: {{ period }}, Period: {{ selectedPeriodType }}
        </div>

        <template v-if="selectedPeriodType === 'week'">
            <div>
                <div>Reapeat on:</div>
                <template v-for="day in weekDays" :key="day.id">
                    <div>
                        <label :for="day">{{ day.name }}</label>
                        <input
                            type="checkbox"
                            :id="day.id"
                            :value="day.id"
                            v-model="selectedDays"
                        />
                    </div>
                </template>
            </div>
        </template>

        <div>Ends:</div>
        <DatepickerComponent
            monthNameFormat="long"
            locale="lt"
            utc
            :dark="true"
            :multiDates="false"
            :enableTimePicker="false"
            v-model="endDate"
        >
        </DatepickerComponent>
    </div>

    <template v-for="date in selectedDates" :key="date">
        <pre>
            <div>Locale: {{ new Date(date) }}</div>
            <div>UTC: {{ date }}</div>
            <div>Without Time: {{ new Date(date).toDateString() }}</div>
        </pre>

    </template>

    <button
        type="submit"
        @click="
            repeatMultipleDays(
                this.selectedDates,
                this.selectedPeriodType
            )
        "
    >
        Repeat MULTIPLE <span>{{ period }}</span> Selected <span>{{ selectedPeriodType }}</span>
    </button>
</template>

<script>
import DatepickerComponent from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
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
            currentYear: new Date().getFullYear(),
            currentMonth: new Date().getMonth(),
            currentDate: new Date().getDate(),
            currentDay: new Date().getDay(),
            monthsInYear: 12,
            daysInWeek: 7,
            dayInMiliseconds: 86400000,
            
            weekDays: [
                { 
                    id: 0,
                    name: 'Sunday',
                    date: null, 
                },
                { 
                    id: 1,
                    name: 'Monday',
                    date: null, 
                },
                { 
                    id: 2,
                    name: 'Tuesday',
                    date: null, 
                },
                { 
                    id: 3,
                    name: 'Wednesday',
                    date: null, 
                },
                { 
                    id: 4,
                    name: 'Thursday',
                    date: null, 
                },
                { 
                    id: 5,
                    name: 'Friday',
                    date: null, 
                },
                { 
                    id: 6,
                    name: 'Saturday',
                    date: null, 
                },
            ],
            months: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ],
            daysInMonths: []
        }
    },

    methods: {

        daysInMonth(month, year) {
            return new Date(year, month, 0).getDate()
        },
        selectDate(event) {
            console.log(event);
            if (event !== null) {

                this.selectedDates = [];
                this.selectedDates.push(...event);

                for (const date of this.selectedDates) {
                    this.selectedDays.push(new Date(date).getDay());
                }
                

                // init week days with start dates
                for (let i = 0; i < this.daysInWeek; i++) {
                    console.log(new Date(new Date(new Date(this.selectedDates[0]).getTime() + i * 86400000).toDateString()));
                    console.log(new Date(new Date(new Date(this.selectedDates[0]).getTime() + i * 86400000).toDateString()).getDay());

                    for (const days of this.weekDays) {
                        if (days.id === new Date(new Date(new Date(this.selectedDates[0]).getTime() + i * 86400000).toDateString()).getDay()) {
                            days.date = new Date(new Date(new Date(this.selectedDates[0]).getTime() + i * 86400000).toDateString());
                        }
                    }

                }
                

            } else {

                this.selectedDates = null;
                this.selectedDays = [];

            }

        },

        repeatDays(period, date, endDate, multiplier) {

            // // init deadline, start, end
            let deadline = 0;
            let newDates = [];
            let newEnd = 0;

            //  Format: Thu Nov 10 2022 00:00:00 GMT+0200 (Eastern European Standard Time) current time zone
            let start = new Date(new Date(date).toDateString());
            // custom end date
            let end = new Date(new Date(endDate).toDateString());
            //current month end by default
            let thisMonthEnd = new Date(
                new Date(
                    this.currentYear,
                    this.currentMonth + 1,
                    0
                ).toDateString()
            );

            newDates = [JSON.parse(JSON.stringify(new Date(new Date(date).toDateString())))];

            if (endDate !== null) {
                // timestamp
                deadline = Math.ceil(end - start) / this.dayInMiliseconds;
                newEnd = end; 

            } else {
                deadline = Math.ceil(thisMonthEnd - start) / this.dayInMiliseconds;
                newEnd = thisMonthEnd;
            }

                let intervals = Math.round(deadline / period);

                for (let i = 0; i <= intervals; i++) {

                    const newDate = new Date(start.getTime() + (i+1) * this.dayInMiliseconds * multiplier * period);

                    if (newDate <= newEnd.getTime()) {
                        // newDates = [...newDates, new Date(newDate).toISOString()];
                        newDates.push(new Date(newDate).toISOString());
                    }

                }

            return newDates;
        },

        repeatWeekDays(period, date, endDate, multiplier) {

            console.log('end: ', endDate);

            let end = new Date(new Date(endDate).toDateString());
            let start = new Date(new Date(date).toDateString());

            const newDates = [];

            let deadline = Math.ceil(end - start) / 86400000;

            const mainInterval = Math.round(deadline / (period * multiplier));

            for (let i = 0; i <= mainInterval; i++) {

                let newDate = new Date(start.getTime() + i * 86400000 * multiplier * period);
            
                if (newDate <= end.getTime()) {
                    newDates.push(new Date(newDate).toISOString());
                }

            }

            return newDates;
        },


        repeatMultipleDays(dates, selectedPeriodType, selectedDays) {
            const multipleDays = [];
            let multiplier = 0;

            console.log(selectedDays)

            for (const date of dates) {
                multipleDays.push(
                    JSON.parse(
                        JSON.stringify(new Date(new Date(date).toDateString()))
                    )
                )
            }
            // Reset state of selected dates
            this.selectedDates = [];

            switch (selectedPeriodType) {
                case 'day':
                        multiplier = 1;
                        for (const date of multipleDays) {
                            let tempArr = this.repeatDays(this.period, date, this.endDate, multiplier);
                            this.selectedDates.push(...tempArr);
                        }
                    break;
                        
                case 'week':
                        multiplier = 7;
                        for (const date of multipleDays) {
                            let tempArr = this.repeatWeekDays(this.period, date, this.endDate, multiplier);
                            console.log('temp: ', tempArr);
                            this.selectedDates.push(...tempArr);
                        }
                    break;
                    
                case 'month':

                    break;

                default:
                    break;
            }
            
        },



    },

    mounted() {
        for (let i = 0; i < this.monthsInYear; i++) {
            this.daysInMonths.push({
                month: this.months[i],
                days: this.daysInMonth(i + 1, this.currentYear)
            })
        }
        
    }
}
</script>

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

span {
    font-weight: 800;
}
</style>