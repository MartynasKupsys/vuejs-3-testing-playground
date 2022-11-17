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
            
        >
        </DatepickerComponent>
        <!-- :disabledDates="(date) => date < this.currentYearMonthDate" -->
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
                <template v-for="day in weekDays" :key="day.id + 1">
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

        <button
        type="submit"
        @click="repeatMultipleDays(this.selectedDates, this.selectedPeriodType, this.selectedDays)"
    >
        Repeat MULTIPLE <span>{{ period }}</span> Selected <span>{{ selectedPeriodType }}</span>
    </button>
    </div>

    <template v-for="date in selectedDates" :key="date">
        <pre>
            <div>Locale: {{ new Date(date) }}</div>
            <div>UTC: {{ date }}</div>
            <div>Without Time: {{ new Date(date).toDateString() }}</div>
        </pre>

    </template>
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
            primarySelectedDates: [],
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

    watch: {
        selectedDates: {
            handler(newVal, oldVal) {
                console.log('new: ', newVal);
                console.log('old: ', oldVal);

                if (oldVal === null) {
                    this.primarySelectedDates = [...newVal];
                } else {
                    this.primarySelectedDates = [...oldVal];
                }

            }
        }
    },

    methods: {

        plusMonth(date, index, period) {
            let m = new Date(date);
            console.log('index: ', index);
            m.setMonth(m.getMonth() + 1 * index * period);

            console.log(m);

            return m.toISOString();
        },

        plusYear(date, index, period) {
            // let now = new Date()
            // now.setFullYear(now.getFullYear() + 1)

            // console.log('Next Year: ', new Date(now))
            let y = new Date(date);
            console.log('index: ', index);
            y.setFullYear(y.getFullYear() + 1 * index * period);

            console.log(y);

            return y.toISOString();
        },

        daysInMonth(month, year) {
            return new Date(year, month, 0).getDate()
        },

        getDatesOfSelectedDays(selectedDays, weekDays) {

            const needDays = [];

            for (const selectedDay of selectedDays) {
                needDays.push(weekDays.find(el => el.id === selectedDay).date.toISOString());
            }

            return needDays;
        },

        selectDate(event) {
            if (event !== null) {

                console.log('event : ', event);

                // reset dates
                this.selectedDates = [];
                // this.primarySelectedDates = [];

                // push new dates
                this.selectedDates.push(...event);
                // this.primarySelectedDates.push(...event);
                this.selectedDates = [...this.selectedDates.sort()];

                this.selectedDays = this.selectedDates.map(date => new Date(date).getDay());
                this.selectedDays = [...new Set(this.selectedDays)];

                // init week days with first selected dates
                for (let i = 0; i < this.daysInWeek; i++) {
                    
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

            // ====================================================================================================
            // // init deadline, start, end
            let newDates = [];
            let deadline = 0;
            let newEnd = 0;
            let start = new Date(new Date(date).toDateString());
            let end = new Date(new Date(endDate).toDateString());
            
            let defaultEnd = new Date(
                new Date(
                    this.currentYear,
                    this.currentMonth + 1,
                    this.currentDate
                ).toDateString()
            );

            if (endDate !== null) {
                deadline = Math.ceil(end - start) / this.dayInMiliseconds;
                newEnd = end; 

            } else {
                deadline = Math.ceil(defaultEnd - start) / this.dayInMiliseconds;
                newEnd = defaultEnd;
            }

            // ========================================================================================================

                const mainInterval = Math.round(deadline / period);

                for (let i = 0; i <= mainInterval; i++) {

                    const newDate = new Date(start.getTime() + i * this.dayInMiliseconds * multiplier * period);

                    if (newDate <= newEnd.getTime()) {
                        newDates.push(new Date(newDate).toISOString());
                    }

                }

            return newDates;
        },

        repeatWeekDays(period, date, endDate, multiplier) {

            // ==========================================================================================

            const newDates = [];
            let deadline = 0;
            let newEnd = 0;
            let end = new Date(new Date(endDate).toDateString());
            let start = new Date(new Date(date).toDateString());

            let defaultEnd = new Date(
                new Date(
                    this.currentYear,
                    this.currentMonth + 3,
                    this.currentDate - 1
                ).toDateString()
            );

            if (endDate !== null) {
                // timestamp
                deadline = Math.ceil(end - start) / this.dayInMiliseconds;
                newEnd = end; 

            } else {
                deadline = Math.ceil(defaultEnd - start) / this.dayInMiliseconds;
                newEnd = defaultEnd;
            }

            // =============================================================================================

            const mainInterval = Math.round(deadline / (period * multiplier));

            for (let i = 0; i <= mainInterval; i++) {

                const newDate = new Date(start.getTime() + i * this.dayInMiliseconds * multiplier * period);
            
                if (newDate <= newEnd.getTime()) {
                    newDates.push(new Date(newDate).toISOString());
                }

            }

            return newDates;
        },

        repeatMonthDays(period, date, endDate) {

            // =============================================================================================================================

            const newDates = [];
            let deadline = 0;
            let end = new Date(new Date(endDate).toDateString());
            let start = new Date(new Date(date).toDateString());
            let defaultEnd = new Date(
                new Date(
                    this.currentYear + 1,
                    this.currentMonth + 1,
                    this.currentDate
                ).toDateString()
            );

            if (!endDate) {
                deadline = Math.ceil(defaultEnd.getMonth() - start.getMonth() + 12 * (defaultEnd.getFullYear() - start.getFullYear()));
            } else {
                deadline = Math.ceil(end.getMonth() - start.getMonth() + 12 * (end.getFullYear() - start.getFullYear()));
            }

            // ===========================================================================================================================

            const mainInterval = Math.round(deadline / period);

            for (let i = 0; i < mainInterval; i++) {
                const newDate = this.plusMonth(date, i, period);

                    newDates.push(newDate);
            }

            return newDates;
        },

        repeatYearDays(period, date, endDate) {

            // ===========================================================================
            const newDates = [];
            let deadline = 0;
            let end = new Date(new Date(endDate).toDateString());
            let start = new Date(new Date(date).toDateString());
            let defaultEnd = new Date(
                new Date(
                    this.currentYear + 6,
                    this.currentMonth + 1,
                    this.currentDate
                ).toDateString()
            );

            if (!endDate) {
                deadline = Math.ceil(defaultEnd.getFullYear() - start.getFullYear());
            } else {
                deadline = Math.ceil(end.getFullYear() - start.getFullYear());
            }

            // ==========================================================================

            const mainInterval = Math.round(deadline / period);

            for (let i = 0; i < mainInterval; i++) {
                const newDate = this.plusYear(date, i, period);

                    newDates.push(newDate);
            }

            return newDates;
        },


        repeatMultipleDays(dates, selectedPeriodType, selectedDays) {
            const multipleDays = [];
            const selectedDatesTemp = [];
            let multiplier = 0;

            console.log('selected days: ', selectedDays);

            if (!dates || !selectedDays.length) {
                alert('Select your date!');
                return;
            }

            switch (selectedPeriodType) {
                case 'day':
                    multiplier = 1;

                    for (const date of dates) {
                        let tempArr = this.repeatDays(this.period, date, this.endDate, multiplier);
                        selectedDatesTemp.push(...tempArr);
                    }

                    this.selectedDates = [...new Set(selectedDatesTemp)];
                break;
                        
                case 'week':
                    multiplier = 7;

                    multipleDays.push(...this.getDatesOfSelectedDays(this.selectedDays, this.weekDays));

                    for (const date of multipleDays) {
                        let tempArr = this.repeatWeekDays(this.period, date, this.endDate, multiplier);
                        selectedDatesTemp.push(...tempArr);
                    }

                    this.selectedDates = [...new Set(selectedDatesTemp)];
                break;
                    
                case 'month': 
                    for (const date of dates) {
                        let tempArr = this.repeatMonthDays(this.period, date, this.endDate);
                        selectedDatesTemp.push(...tempArr);
                    } 

                    this.selectedDates = [...new Set(selectedDatesTemp)];
                break;

                case 'year':

                    for (const date of dates) {
                        let tempArr = this.repeatYearDays(this.period, date, this.endDate);
                        selectedDatesTemp.push(...tempArr); 
                    }

                    this.selectedDates = [...new Set(selectedDatesTemp)];
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