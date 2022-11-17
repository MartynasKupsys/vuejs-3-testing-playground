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
        <div class="modal-calendar-container d-flex justify-content-around">
          <div id="date-picker-date-1" class="">
            <DatepickerComponent
                monthNameFormat="long"
                id="picker-main"
                ref="datepickerMain"
                :locale="locale"
                inline
                :multiDates="true"
                :enableTimePicker="false"
                :modelValue="selectedDates" @update:modelValue="selectDate($event)">
            </DatepickerComponent>
            <!-- auto-apply -->
          </div>
        </div>

        <template v-if="openPredifinedModal">
            <select :value="selectedPredifinedOption" @change="selectPredifinedOption($event)" class="container__selected">
                    <option data-option1="option-1" selected>option 1</option>
                    <option data-option2="option-2">option 2</option>
                    <option data-option3="option-3">option 3</option>
                    <option data-option4="option-4">option 4</option>
                    <option data-option5="option-5">option 5</option>
                    <option data-option6="option-6">option 6</option>
                    <option data-option7="option-6">option 7</option>
                </select>
        </template>

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




</template>
  
  <script>
  import DatepickerComponent from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  import ModalComponent from './ModalComponent.vue';
  
  export default {
    name: 'CalendarBackup',
    components: {
      ModalComponent,
      DatepickerComponent
    },
    props: {},
  
    data() {
      return {
        openPredifinedModal: false,
        openCustomModal: false, 
        selectedPredifinedOption: 'option 1',
        locale: 'lt',
        period: 1,
        selectedPeriodType: "day",
        selectedDays: [],
        selectedDates: [],
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

      };
    },

       watch: {
        selectedDates: {
            handler(newVal, oldVal) {
                console.log("new: ", newVal);
                console.log("old: ", oldVal);
                // if (oldVal === null) {
                //     this.primarySelectedDates = [...newVal];
                // }
                // else {
                //     this.primarySelectedDates = [...oldVal];
                // }
                // const temp = [...new Set(this.selectedDates.map(el => el.toISOString()))];
                // this.selectedDates = [...temp.map(el => new Date(el))];
                // console.log('temp:', temp);
            }
        }
    },

    methods: {

        selectPredifinedOption(event) {
            console.log(event.target.value);
        },
        // clearedSelect(event) {
        //     console.log('cleard select: ', event.target.value);
        //     console.log('cleared');
        //     this.$nextTick(() => console.log('cleared'));
        // },
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
        daysInMonth(month, year) {
            return new Date(year, month, 0).getDate();
        },
        getDatesOfSelectedDays(selectedDays, weekDays) {
            const needDays = [];
            for (const selectedDay of selectedDays) {
                needDays.push(weekDays.find(el => el.id === selectedDay).date);
            }
            return needDays;
        },
        selectDate(event) {
            this.selectedDates = [];
            this.selectedDays = [];

            if (event !== null) {
                console.log("event : ", event);
                // push new dates
                this.selectedDates.push(...event);
                // this.primarySelectedDates.push(...event);
                // this.selectedDates = [...this.selectedDates];
                const temp = [...new Set(this.selectedDates.map(el => el.toISOString()))];
                this.selectedDates = [...temp.map(el => new Date(el))];

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
                this.openPredifinedModal = true;
            }
            
            if (event === null) {
                this.openPredifinedModal = false;
                console.log('alert!!!');
                
                this.selectedDates = [];
                this.selectedDays = [];
            }

            console.log('event: ', event);
                
        },
        selectPeriodType(event) {
            let defaultEnd = "";
            switch (event.target.value) {
                case "day":

                    defaultEnd = new Date(this.currentYear, this.currentMonth + 1, this.currentDate);
                    console.log("day: ", defaultEnd);

                    break;
                case "week":

                    defaultEnd = new Date(this.currentYear, this.currentMonth + 3, this.currentDate - 1);
                    console.log("week: ", defaultEnd);

                    break;
                case "month":

                    defaultEnd = new Date(this.currentYear + 1, this.currentMonth, this.currentDate);
                    console.log("month: ", defaultEnd);

                    break;
                case "year":

                    defaultEnd = new Date(this.currentYear + 5, this.currentMonth + 1, this.currentDate);
                    console.log("year: ", defaultEnd);

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
            let newEnd = 0;
            let mainInterval;
            let start = new Date(new Date(date).toDateString());
            let end = new Date(new Date(endDate).toDateString());

            switch (selectedPeriodType) {
                case "day":

                    deadline = Math.ceil(end - start) / this.dayInMiliseconds;
                    newEnd = end;
                    mainInterval = Math.round(deadline / period);

                    for (let i = 0; i < mainInterval; i++) {
                        const newDate = new Date(start.getTime() + i * this.dayInMiliseconds * multiplier * period);
                        if (newDate < newEnd.getTime()) {
                            newDates.push(new Date(newDate));
                        }
                    }

                    break;
                case "week":

                    deadline = Math.ceil(end - start) / this.dayInMiliseconds;
                    newEnd = end;
                    mainInterval = Math.round(deadline / (period * multiplier));

                    for (let i = 0; i < mainInterval; i++) {
                        const newDate = new Date(start.getTime() + i * this.dayInMiliseconds * multiplier * period);
                        if (newDate < newEnd.getTime()) {
                            newDates.push(new Date(newDate));
                        }
                    }

                    break;
                case "month":

                    deadline = Math.ceil(end.getMonth() - start.getMonth() + 12 * (end.getFullYear() - start.getFullYear()));
                    mainInterval = Math.ceil(deadline / period);

                    for (let i = 0; i < mainInterval; i++) {
                        const newDate = this.plusMonth(date, i, period);
                        if (new Date(newDate).getTime() < new Date(endDate).getTime()) {
                            newDates.push(newDate);
                        }
                    }

                    break;
                case "year":

                    deadline = end.getFullYear() - start.getFullYear();
                    mainInterval = Math.ceil(deadline / period);

                    for (let i = 0; i < mainInterval; i++) {
                        const newDate = this.plusYear(date, i, period);
                        if (new Date(newDate).getTime() < new Date(endDate).getTime()) {
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

                    // this.selectedDates = [...new Set(selectedDatesTemp)];
                    // selectedDatesTemp = [...new Set(selectedDatesTemp.map(el => el.toISOString()))];
                    // this.selectedDates = [...selectedDatesTemp.map(el => new Date(el))];

                    break;
                case "week":
                    multiplier = 7;

                    multipleDays.push(...this.getDatesOfSelectedDays(this.selectedDays, this.weekDays));

                    for (const date of multipleDays) {
                        let tempArr = this.calculateDates(this.period, date, this.endDate, multiplier, selectedPeriodType);
                        selectedDatesTemp.push(...tempArr);
                    }

                    // this.selectedDates = [...new Set(selectedDatesTemp)];
                    // selectedDatesTemp = [...new Set(selectedDatesTemp.map(el => el.toISOString()))];
                    // this.selectedDates = [...selectedDatesTemp.map(el => new Date(el))];

                    break;
                case "month":

                    for (const date of dates) {
                        let tempArr = this.calculateDates(this.period, date, this.endDate, multiplier, selectedPeriodType);
                        selectedDatesTemp.push(...tempArr);
                    }

                    // this.selectedDates = [...new Set(selectedDatesTemp)];
                    // selectedDatesTemp = [...new Set(selectedDatesTemp.map(el => el.toISOString()))];
                    // this.selectedDates = [...selectedDatesTemp.map(el => new Date(el))];

                    break;
                case "year":

                    for (const date of dates) {
                        let tempArr = this.calculateDates(this.period, date, this.endDate, multiplier, selectedPeriodType);
                        selectedDatesTemp.push(...tempArr);
                    }

                    // this.selectedDates = [...new Set(selectedDatesTemp)];
                    // selectedDatesTemp = [...new Set(selectedDatesTemp.map(el => el.toISOString()))];
                    // this.selectedDates = [...selectedDatesTemp.map(el => new Date(el))];

                    break;
                default:
                    break;
            }

            selectedDatesTemp = [...new Set(selectedDatesTemp.map(el => el.toISOString()))];
            this.selectedDates = [...selectedDatesTemp.map(el => new Date(el))];
        },
    },
  
    mounted() {

        for (let i = 0; i < this.monthsInYear; i++) {
            this.daysInMonths.push({
                month: this.months[i],
                days: this.daysInMonth(i + 1, this.currentYear)
            });
        }
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

        console.log(this.$refs);
  
  
    }
  }
  </script>

<style lang="scss">

@import '../variables.scss';

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

// .dp__menu {
//   border-radius: 16px;
//   padding: 0.2rem;
// }



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

.dp__month_year_col_nav:nth-child(1) {

}
.dp__month_year_col_nav:nth-child(4) {
  display: flex;
  //width: 100%;
  justify-content: flex-end;
}














</style>
  