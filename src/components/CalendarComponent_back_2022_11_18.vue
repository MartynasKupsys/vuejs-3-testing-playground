<template>
    <div class="row">
      <div class="col-1 m-0"></div>
      <div class="col-11 m-0 position-relative input-col-10-padding" :data-bs-toggle="'modal'"
           :data-bs-target="'#picker-frequency'">
          <input class="custom-select-frequency"
                 id="picker-frequency-date"
                 placeholder="Pasirinkite kelionės dažnumą"/>
          <div class="arrow-select position-absolute icon-calender-position">
            <img src="../icons/calendar-calendar-1.svg">
          </div>
      </div>
    </div>

    <ModalComponent :id-data="'picker-frequency'" :modal-title="'Pasirinkite kelionės dažnumą'">
      <template #body-content>
        <div class="modal-calendar-container d-flex flex-column align-items-center">
            <div class="modal-calendar-container d-flex flex-row">
                <div id="date-picker-date-1">
                    <!-- <template v-if="multiDates">
                        <DatepickerComponent
                            monthNameFormat="long"
                            id="picker-main"
                            ref="datepickerMain"
                            :locale="locale"
                            inline
                            auto-apply
                            :multiDates="true"
                            :enableTimePicker="false"
                            :modelValue="displaySelectedDates">
                        </DatepickerComponent>
                    </template>
                    <template v-else> -->
                        <DatepickerComponent
                            monthNameFormat="long"
                            id="picker-main"
                            ref="datepickerMain"
                            :locale="locale"
                            inline
                            auto-apply
                            :multi-dates="true"
                            :enableTimePicker="false"
                            :modelValue="selectedDates" @update:modelValue="selectDate($event)"
                            @internalModelChange="internalModelChange($event)">
                        </DatepickerComponent>
                    <!-- </template> -->
                    
                </div>
            </div>
                    <div class="col-5">
                        <ButtonComponent @click="submit" class="order-form-submit-button m-0 w-100">
                            <template #btnContent>
                                Select Date
                            </template>
                        </ButtonComponent>
                    </div>

        </div>

        <template v-if="openCustomModal">

            <div class="container">
                Repeat every:
                <input
                    class="container__frequency"
                    type="number"
                    min="1"
                    v-model="period"
                />
                <select :value="selectedPeriodType" @change="selectPeriodType($event)" class="container__selected">
                    <option :value="'day'" selected>day</option>
                    <option :value="'week'">week</option>
                    <option :value="'month'">month</option>
                    <option :value="'year'">year</option>
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
                    :dark="true"
                    :multiDates="false"
                    :enableTimePicker="false"
                    v-model="endDate"
                    id="picker-end-date"
                    ref="datepicker-end-date"
                >
                </DatepickerComponent>

                <button type="submit" @click="calculateMultipleDays(this.selectedDates, this.selectedPeriodType, this.selectedDays)">
                    <p class="m-0">Repeat MULTIPLE <span>{{ period }}</span> Selected <span>{{ selectedPeriodType }}</span></p>
                </button>
            </div>
        </template>

      </template>
    </ModalComponent>

    <Teleport to="#modals">
        <div v-if="openPredifinedModal" class="position-absolute predifined-select-modal" id="predifined-select-modal">
            <select :value="selectedPredifinedOption" @change.prevent="selectPredifinedOption($event)" class="container__selected">
                <option :value="'choose'" disabled> Select a option</option>
                <option :value="'notrepeat'">Does not reapeat</option>
                <option :value="'daily'">Daily</option>
                <option :value="'weekly'">Weekly on {{ this.weekDays[this.selectedDates[0].getDay()].name }}</option>
                <option :value="'monthly'">Monthly on the (third Wednesday)</option>
                <option :value="'annually'">Annually on (November 16)</option>
                <option :value="'weekday'">Every weekday (Monday to Friday)</option>
                <option :value="'custom'">Custom...</option>
            </select>
            <button @click="close({id: 'predifined-select-modal', backdrop: 'custom-modal-backdrop-0', bodyOverflow: 'body-overflow'})" class="modal-close-button">X</button>
        </div>
    </Teleport>

</template>
  
<script>
import DatepickerComponent from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import ButtonComponent from './ButtonComponent.vue';
import ModalComponent from './ModalComponent.vue';
  
export default {
    name: 'CalendarComponent',
    components: {
    ModalComponent,
    DatepickerComponent,
    ButtonComponent
},
    props: {},
  
    data() {
      return {
        openPredifinedModal: false,
        openCustomModal: false, 

        // ====== main selected data ======
        selectedPredifinedOption: 'choose',
        locale: 'lt',
        period: 1,
        selectedPeriodType: "day",
        selectedDays: [],
        selectedDates: [],
        endDate: null,
        // ================================

        internalDates: [],
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
                name: "Sunday",
                date: null,
            },
            {
                id: 1,
                name: "Monday",
                date: null,
            },
            {
                id: 2,
                name: "Tuesday",
                date: null,
            },
            {
                id: 3,
                name: "Wednesday",
                date: null,
            },
            {
                id: 4,
                name: "Thursday",
                date: null,
            },
            {
                id: 5,
                name: "Friday",
                date: null,
            },
            {
                id: 6,
                name: "Saturday",
                date: null,
            },
        ],
        // months: [
        //     "January",
        //     "February",
        //     "March",
        //     "April",
        //     "May",
        //     "June",
        //     "July",
        //     "August",
        //     "September",
        //     "October",
        //     "November",
        //     "December"
        // ],
        // daysInMonths: []

      };
    },

    methods: {

        internalModelChange(event) {
            if (event !== null) {
                this.internalDates = [...event];
            }
        },

        close(payload) {
  
            let parentEl = document.querySelector('body');
            let backdrop = document.querySelector('.' + payload.backdrop);

            let modal = document.querySelector('#' + payload.id);
            modal.style.display = 'none';

            parentEl.classList.remove(payload.bodyOverflow);
            if (backdrop && parentEl) {
                backdrop.classList.remove('fade-in-backdrop');
                backdrop.classList.add('fade-out-backdrop');

                backdrop.addEventListener('animationend', () => {
                    if (backdrop && parentEl) {
                        parentEl.removeChild(backdrop);
                    }
                })
            }
            this.openPredifinedModal = !this.openPredifinedModal; 
        },

        submit() {
            console.log(this.selectedDates);
        },

        selectPredifinedOption(event) {
            this.selectedPredifinedOption = [];
            let newDates = [];

            let startDate = this.selectedDates[this.selectedDates.length - 1];

            switch (event.target.value) {

                case 'notrepeat':

                    this.endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

                    break;

                case 'daily':
                
                    this.endDate = new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate());

                    newDates = this.calculateDates(1, this.selectedDates[0], this.endDate, 1, 'day');
                    this.selectedDates = [...newDates];

                    break;

                case 'weekly':

                    this.endDate = new Date(startDate.getFullYear() + 14, startDate.getMonth(), startDate.getDate());

                    newDates = this.calculateDates(1, this.selectedDates[0], this.endDate, 7, 'week');
                    this.selectedDates = [...newDates];

                    break;
                case 'monthly':

                    this.endDate = new Date(startDate.getFullYear() + 15, startDate.getMonth(), startDate.getDate());

                    // newDates = this.calculateDates(1, this.selectedDates[0], this.endDate, 0, 'month');



                    this.selectedDates = [...newDates];

                    console.log(event.target.value);
                    break;
                case 'annually':
                    console.log(event.target.value);
                    break;
                case 'weekday':
                    console.log(event.target.value);
                    break;
                case 'custom':
                    console.log(event.target.value);
                    break;
            
                default:
                    break;
            }

            this.close({id: 'predifined-select-modal', backdrop: 'custom-modal-backdrop-0', bodyOverflow: 'body-overflow'});

            this.selectedPredifinedOption = event.target.value;
        },
        plusMonth(date, index, period) {
            let m = new Date(date);
            m.setMonth(m.getMonth() + 1 * index * period);
            return m;
        },
        plusYear(date, index, period) {
            let y = new Date(date);
            y.setFullYear(y.getFullYear() + 1 * index * period);
            return y;
        },
        // daysInMonth(month, year) {
        //     return new Date(year, month, 0).getDate();
        // },
        getDatesOfSelectedDays(selectedDays, weekDays) {
            const needDays = [];
            for (const selectedDay of selectedDays) {
                needDays.push(weekDays.find(el => el.id === selectedDay).date);
            }
            return needDays;
        },
        selectDate(event) {

            this.selectedDays = [];
            this.selectedPredifinedOption = "choose";
            let dates = [];

            if (event === null) {

                this.selectedDates = [...this.selectedDates];

            }

            if (event !== null) {

                if (event.length > 2) {

                    if (event.length - this.internalDates.length === 1) {

                        this.selectedDates = [event[event.length-1]];

                    } else {
                        dates = this.internalDates.filter(date => {
                                return !event.includes(date);
                            });
                        this.selectedDates = [...dates];
                    }

                } else {

                    this.selectedDates = [event[event.length-1]];

                }

            }  

            this.selectedDays = this.selectedDates.map(date => new Date(date).getDay());
            this.selectedDays = [...new Set(this.selectedDays)];
            // init week days with first selected dates
            for (let i = 0; i < this.daysInWeek; i++) {
                for (const days of this.weekDays) {
                    if (days.id === new Date(new Date(this.selectedDates[0].getTime() + i * 86400000).toDateString()).getDay()) {
                        days.date = new Date(new Date(this.selectedDates[0].getTime() + i * 86400000).toDateString());
                    }
                }
            }

            this.openPredifinedModal = true;

            let parentEl = document.querySelector('body');
            let backdrop = document.createElement('div');

            backdrop.classList.add('custom-modal-backdrop-0');
            backdrop.classList.add('fade-in-backdrop');

            if (parentEl) {
                parentEl.classList.add('body-overflow');
                parentEl.insertAdjacentElement('beforeend', backdrop);
            }
        },
        selectPeriodType(event) {
            let defaultEnd = "";
            // let startDate = this.selectedDates[this.selectedDates.length - 1];
            switch (event.target.value) {
                case "day":

                    defaultEnd = new Date(this.currentYear, this.currentMonth + 1, this.currentDate);
                    // this.endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate());

                    break;
                case "week":

                    defaultEnd = new Date(this.currentYear, this.currentMonth + 3, this.currentDate - 1);

                    break;
                case "month":

                    defaultEnd = new Date(this.currentYear + 1, this.currentMonth, this.currentDate);

                    break;
                case "year":

                    defaultEnd = new Date(this.currentYear + 5, this.currentMonth + 1, this.currentDate);

                    break;
                default:
                    break;
            }

            this.endDate = defaultEnd;
            this.selectedPeriodType = event.target.value;
        },
        calculateDates(period, date, endDate, multiplier, selectedPeriodType) {
            // // init deadline, start, end
            let newDates = [];
            let deadline = 0;
            // let newEnd = 0;
            let mainInterval;
            let start = new Date(new Date(date).toDateString());
            let end = new Date(new Date(endDate).toDateString());

            switch (selectedPeriodType) {
                case "day":

                    deadline = Math.ceil(end - start) / this.dayInMiliseconds;
                    // newEnd = end;
                    mainInterval = Math.round(deadline / period);

                    for (let i = 0; i < mainInterval; i++) {
                        const newDate = new Date(start.getTime() + i * this.dayInMiliseconds * multiplier * period);
                        if (newDate < end.getTime()) {
                            newDates.push(new Date(newDate));
                        }
                    }

                    break;
                case "week":

                    deadline = Math.ceil(end - start) / this.dayInMiliseconds;
                    // newEnd = end;
                    mainInterval = Math.round(deadline / (period * multiplier));

                    for (let i = 0; i < mainInterval; i++) {
                        const newDate = new Date(start.getTime() + i * this.dayInMiliseconds * multiplier * period);
                        if (newDate < end.getTime()) {
                            newDates.push(new Date(newDate));
                        }
                    }

                    break;
                case "month":

                    deadline = Math.ceil(end.getMonth() - start.getMonth() + 12 * (end.getFullYear() - start.getFullYear()));
                    // newEnd = end;
                    mainInterval = Math.ceil(deadline / period);

                    for (let i = 0; i < mainInterval; i++) {
                        const newDate = this.plusMonth(date, i, period);
                        if (new Date(newDate).getTime() < new Date(end).getTime()) {
                            newDates.push(newDate);
                        }
                    }

                    break;
                case "year":

                    deadline = end.getFullYear() - start.getFullYear();
                    // newEnd = end;
                    mainInterval = Math.ceil(deadline / period);

                    for (let i = 0; i < mainInterval; i++) {
                        const newDate = this.plusYear(date, i, period);
                        if (new Date(newDate).getTime() < new Date(end).getTime()) {
                            newDates.push(newDate);
                        }
                    }

                    break;
                default:
                    break;
            }
            return newDates;
        },
        calculateMultipleDays(dates, selectedPeriodType, selectedDays) {

            const multipleDays = [];
            let selectedDatesTemp = [];
            let multiplier = 0;

            if (!dates || !selectedDays.length) {
                alert("Select your date!");
                return;
            }

            switch (selectedPeriodType) {
                case "day":
                    multiplier = 1;

                    for (const date of dates) {
                        let tempArr = this.calculateDates(this.period, date, this.endDate, multiplier, selectedPeriodType);
                        selectedDatesTemp.push(...tempArr);
                    }

                    break;
                case "week":
                    multiplier = 7;

                    multipleDays.push(...this.getDatesOfSelectedDays(this.selectedDays, this.weekDays));

                    for (const date of multipleDays) {
                        let tempArr = this.calculateDates(this.period, date, this.endDate, multiplier, selectedPeriodType);
                        selectedDatesTemp.push(...tempArr);
                    }

                    break;
                case "month":
                case "year":

                    for (const date of dates) {
                        let tempArr = this.calculateDates(this.period, date, this.endDate, multiplier, selectedPeriodType);
                        selectedDatesTemp.push(...tempArr);
                    }

                    break;
                default:
                    break;
            }

            selectedDatesTemp = [...new Set(selectedDatesTemp.map(el => el.toISOString()))];
            this.selectedDates = [...selectedDatesTemp.map(el => new Date(el))];
        },
    },
  
    mounted() {

        // for (let i = 0; i < this.monthsInYear; i++) {
        //     this.daysInMonths.push({
        //         month: this.months[i],
        //         days: this.daysInMonth(i + 1, this.currentYear)
        //     });
        // }

        if (this.selectedPeriodType === "day") {
            this.endDate = new Date(new Date(this.currentYear, this.currentMonth + 1, this.currentDate).toDateString());
        }

        let modal = document.querySelector('#picker-frequency');
        let modaldialog = modal.querySelector('.modal-dialog');
        let header = modal.querySelector('.modal-header');
        
        header.classList.add('d-flex');
        header.classList.add('justify-content-center');
        header.classList.add('modal-header-border');

        modaldialog.classList.remove('modal-xl');
        document.querySelector('body').classList.add('position-relative');


        // function daysInMonth(month, year) {
        //     return new Date(year, month, 0).getDate();
        // }

        // function calculateDaysOfMonth(year, month, days) {
        //     const daysArr = [];
        //     for (let i = 0; i < days; i++) {
        //         daysArr.push(
        //             {
        //                 date: new Date(year, month, 1 + i), 
        //                 day: new Date(year, month, 1 + i).getDay()
        //             }
        //         );
        //     }
        //     return daysArr;
        // }

        // function daysOfMonths(j) {
        //     let nowDate = new Date();
        //     const months = [
        //         "January",
        //         "February",
        //         "March",
        //         "April",
        //         "May",
        //         "June",
        //         "July",
        //         "August",
        //         "September",
        //         "October",
        //         "November",
        //         "December",
        //     ];
        //     const dayInMonthArray = [];

        //     for (let i = 0; i < 12; i++) {
        //         dayInMonthArray.push({
        //         id: i,
        //         month: months[i],
        //         daysCount: daysInMonth(i + 1, nowDate.getFullYear() + j),
        //         year: nowDate.getFullYear() + j,
        //         });
        //         dayInMonthArray[i].datesCount = calculateDaysOfMonth(dayInMonthArray[i].year, dayInMonthArray[i].id, dayInMonthArray[i].daysCount);
        //     }

        //     return dayInMonthArray;
        // }

        // const nowYear = daysOfMonths(0);
        // console.log("days in Month", nowYear);

        

        function calculateNthSelectedDay(date){

            let start = new Date(date.toDateString());

            let daysCount = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();

            let monthDaysArr = [];

            for (let j = 0; j < daysCount; j++) {
                    
                if (new Date(start.getFullYear(), start.getMonth(), j + 1).getDay() === start.getDay()) {

                    monthDaysArr.push({date: new Date(start.getFullYear(), start.getMonth(), j + 1), day: new Date(start.getFullYear(), start.getMonth(), j + 1).getDay()});

                }
                    
            }

            for (let i = 0; i < monthDaysArr.length; i++) {
                if (monthDaysArr[i].date.getTime() === start.getTime()) {
                    return i;
                }
            }


            
        }

        function calculateAllNthDays(date, nthDay, day) {

            let start = new Date(date.toDateString());
            let end = new Date(start.getFullYear() + 2, start.getMonth(), start.getDate());
            let interval = end.getMonth() - start.getMonth() + 12 * (end.getFullYear() - start.getFullYear());
            let calculatedDays = [];

            for (let i = 0; i < interval; i++) {
                let fullDate =  new Date(start.getFullYear(), start.getMonth() + i, start.getDate());
                let month = new Date(start.getFullYear(), start.getMonth() + i, start.getDate()).getMonth();
                let daysCount = new Date(start.getFullYear(), start.getMonth() + i + 1, 0).getDate();

                let tempArr = [];

                for (let j = 0; j < daysCount; j++) {
                    
                    if (new Date(fullDate.getFullYear(), month, j + 1).getDay() === day) {

                        tempArr.push({date: new Date(fullDate.getFullYear(), month, j + 1), day: new Date(fullDate.getFullYear(), month, j + 1).getDay()});

                    }
                    
                }

                calculatedDays.push(tempArr);
                
            }

            return calculatedDays.map((el) => el[nthDay-1].date);

        }

        console.log(calculateAllNthDays(new Date(), 3, 5));

        console.log(calculateNthSelectedDay(new Date()));



    }
}
</script>

<style lang="scss">

@import '../variables.scss';

.predifined-select-modal {
    width: 400px;
    height: 100px;
    background-color: #FFFFFF;
    top: 50%;
    left: 35%;
    border-radius: 14px;
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1058;
}

.custom-select-frequency {
  background: #FFFFFF;
  border: 1px solid #CACACA;
  border-radius: 0.5rem;
  padding: 1rem;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #000000;
  margin-bottom: 1.375rem;
  width: 100%;
}

.icon-calender-position {
  top: 1.813rem;
  right: 1.25rem;
}

.modal-calendar-container {
  padding: 32px;
}

.dp__menu {
  border-radius: 16px;
  padding: 0.2rem;
}

.dp__date_hover_end:hover,
.dp__date_hover_start:hover,
.dp__date_hover:hover {
  background-color: $grey-lighter;
  border-radius: 50%;
}

.dp__today {
  border-radius: 50%;
  border: 1px solid $blue;
}

.dp__active_date {
  background-color: $blue;
  border-radius: 50%;
}

.dp__overlay_cell_active {
  background: $blue;
}

.dp__calendar_item {
  padding: 0.2rem;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
}

.dp__arrow_top,
.dp__arrow_bottom,
.dp__arrow_left,
.dp__arrow_right {
  display: none;
}

div.dp__calendar_header_separator {
  display: none;
}
.dp__calendar_header {
  color: $grey;
  width: 100%;
}

.dp__month_year_row {
  justify-content: center;
}

.dp__month_year_select:nth-child(2) {
  //justify-content: end;
  width: 30%;
  //margin-right: 0.2rem;
}
.dp__month_year_select:nth-child(3) {
  //justify-content: start;
  width: 30%;
  //margin-left: 0.2rem;
}

.dp__month_year_select {
  font-weight: 700;
}

.dp__month_year_col_nav {
  width: 40%;
}

.dp__month_year_col_nav:nth-child(4) {
  display: flex;
  //width: 100%;
  justify-content: flex-end;
}
</style>
  