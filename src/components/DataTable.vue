<template>
    <v-container class="">
        <v-row>
            <v-col>
                <v-text-field v-model="search" label="Search" class="mb-3" clearable></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-menu ref="interactionCreationStartMenuRef" v-model="interactionCreationStartMenu"
                    :close-on-content-click="false" transition="scale-transition" offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="interactionCreationStartDate" label="Interaction Creation Date Start"
                            prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                            @click="interactionCreationStartMenu = true"></v-text-field>
                    </template>
                    <v-date-picker v-model="interactionCreationStartDate"
                        @input="interactionCreationStartMenu = false"></v-date-picker>
                </v-menu>
            </v-col>
            <v-col>
                <v-menu ref="interactionCreationEndMenuRef" v-model="interactionCreationEndMenu"
                    :close-on-content-click="false" transition="scale-transition" offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="interactionCreationEndDate" label="Interaction Creation Date End"
                            prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                            @click="interactionCreationEndMenu = true"></v-text-field>
                    </template>
                    <v-date-picker v-model="interactionCreationEndDate"
                        @input="interactionCreationEndMenu = false"></v-date-picker>
                </v-menu>
            </v-col>
            <v-col>
                <v-menu ref="startMenuRef" v-model="startMenu" :close-on-content-click="false"
                    transition="scale-transition" offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="dueDateStart" label="Due Date Start" prepend-icon="mdi-calendar" readonly
                            v-bind="attrs" v-on="on" @click="startMenu = true" clearable></v-text-field>
                    </template>
                    <v-date-picker v-model="dueDateStart" @input="startMenu = false" closeable></v-date-picker>
                </v-menu>
            </v-col>
            <v-col>
                <v-menu ref="endMenuRef" v-model="endMenu" :close-on-content-click="false" transition="scale-transition"
                    offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="dueDateEnd" label="Due Date End" prepend-icon="mdi-calendar" readonly
                            v-bind="attrs" v-on="on" @click="endMenu = true" clearable></v-text-field>
                    </template>
                    <v-date-picker v-model="dueDateEnd" @input="endMenu = false" closeable></v-date-picker>
                </v-menu>
            </v-col>

        </v-row>
        <v-row>
            <v-col>
                <v-select :items="uniqueCountries" v-model="countryFilter" label="Filter by Country"
                    clearable></v-select>
            </v-col>
            <v-col>
                <v-select :items="['Male', 'Female']" v-model="genderFilter" label="Filter by Gender"
                    clearable></v-select>
            </v-col>
            <v-col>
                <v-select :items="contactChannels" v-model="contactChannelFilter" label="Filter by Contact Channel"
                    clearable></v-select>
            </v-col>
            <v-col>
                <v-select :items="statuses" v-model="statusFilter" label="Filter by Status" clearable></v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-data-table :headers="headers" :items="filteredItems" :search=search
                @click:row="(event, row) => showDetail(row.item.id)">
                <template v-slot:item.customer="{ item }">
                    {{ item.customer.first_name }} {{ item.customer.last_name }}
                </template>
                <template v-slot:item.customer.email="{ item }">
                    <a :href="`mailto:${item.customer.email}`">{{ item.customer.email }}</a>
                </template>
                <template v-slot:item.customer.phone="{ item }">
                    <a :href="`tel:${item.customer.phone}`">{{ item.customer.phone }}</a>
                </template>
                <template v-slot:item.customer.country_code="{ item }">
                    <v-tooltip :text="item.customer.country_code" v-if="item.customer.country_code">
                        <template v-slot:activator="{ props }">
                            <country-flag v-bind="props" :country="item.customer.country_code.toLowerCase()"
                                size="small" />
                        </template>
                    </v-tooltip>
                    <template v-else>
                        UNKNOWN
                    </template>

                </template>
                <template v-slot:item.customer.gender="{ item }">
                    <v-tooltip :text="item.customer.gender">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" :color="item.customer.gender === 'Male' ? 'blue' : 'pink'">
                                {{ item.customer.gender === 'Male' ? 'mdi-gender-male' : 'mdi-gender-female' }}
                            </v-icon>
                        </template>
                    </v-tooltip>
                </template>
                <template v-slot:item.contact_channel="{ item }">
                    <v-tooltip :text="item.contact_channel">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props">
                                {{ getContactChannelIcon(item.contact_channel) }}
                            </v-icon>
                        </template>
                    </v-tooltip>
                </template>
                <template v-slot:item.status="{ item }">
                    <v-chip :color="getStatusColorAndIcon(item.status).color" dark>
                        <v-tooltip :text="item.status">
                            <template v-slot:activator="{ props }">
                                <v-icon v-bind="props">{{ getStatusColorAndIcon(item.status).icon }}</v-icon>
                            </template>
                        </v-tooltip>
                    </v-chip>
                </template>
                <template v-slot:item.due_date="{ item }">
                    <span :class="`due-date ${getDueDateColor(item.due_date)}`">
                        {{ new Date(item.due_date).toLocaleString('en-GB', { timeZone: 'UTC' }) }}
                    </span>
                </template>
                <template v-slot:item.interaction_creation_date="{ item }">
                    {{ new Date(item.interaction_creation_date).toLocaleString('en-GB', { timeZone: 'UTC' }) }}
                </template>
                <template v-slot:item.last_comment="{ item }">
                    {{ item.last_comment.substring(0, 40) }}...
                </template>
            </v-data-table>
        </v-row>
    </v-container>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import CountryFlag from 'vue-country-flag-next';
import draggable from 'vuedraggable';
import mockData from '@/mocks/MOCK_DATA.json';

import { getStatusColorAndIcon, getDueDateColor, getContactChannelIcon } from '@/utils'

export default defineComponent({
    components: {
        CountryFlag,
        draggable
    },
    setup() {
        const router = useRouter();
        const items = ref(mockData);
        const headers = ref([
            { title: 'ID', key: 'id' },
            { title: 'Customer Name', key: 'customer', sortable: false },
            { title: 'E-mail', key: 'customer.email' },
            { title: 'Phone', key: 'customer.phone' },
            { title: 'Country', key: 'customer.country_code' },
            { title: 'Gender', key: 'customer.gender' },
            { title: 'Contact Channel', key: 'contact_channel' },
            { title: 'Status', key: 'status' },
            { title: 'Interaction Creation Date', key: 'interaction_creation_date' },
            { title: 'Due Date', key: 'due_date' },
            { title: 'Attachments', key: 'attachments' },
            { title: 'Last Comment', key: 'last_comment', sortable: false },
            { title: 'Assigned To', key: 'assignedTO' },
        ]);

        const draggableHeaders = computed({
            get: () => headers.value,
            set: (newValue) => {
                headers.value = newValue;
            },
        });

        const search = ref('');
        const countryFilter = ref(null);
        const genderFilter = ref(null);
        const contactChannelFilter = ref(null);
        const statusFilter = ref(null);
        const dueDateStart = ref(null);
        const dueDateEnd = ref(null);
        const startMenu = ref(false);
        const endMenu = ref(false);
        const interactionCreationStartDate = ref(null);
        const interactionCreationEndDate = ref(null);
        const interactionCreationStartMenu = ref(false);
        const interactionCreationEndMenu = ref(false);

        const uniqueCountries = computed(() => {
            return [...new Set(items.value.map(item => item.customer.country_code))];
        });
        const contactChannels = computed(() => ['messenger', 'form', 'file', 'twitter', 'facebook']);
        const statuses = computed(() => ['reserved', 'toTreat', 'finished', 'waiting', 'inProgress']);


        const filteredItems = computed(() => {
            return items.value.filter((item) => {
                const dueDate = new Date(item.due_date);
                const startDueDate = dueDateStart.value ? new Date(dueDateStart.value) : null;
                const endDueDate = dueDateEnd.value ? new Date(dueDateEnd.value) : null;

                const interactionDate = new Date(item.interaction_creation_date);
                const startInteractionDate = interactionCreationStartDate.value ? new Date(interactionCreationStartDate.value) : null;
                const endInteractionDate = interactionCreationEndDate.value ? new Date(interactionCreationEndDate.value) : null;


                return (
                    (countryFilter.value === null || item.customer.country_code === countryFilter.value) &&
                    (genderFilter.value === null || item.customer.gender === genderFilter.value) &&
                    (contactChannelFilter.value === null || item.contact_channel === contactChannelFilter.value) &&
                    (statusFilter.value === null || item.status === statusFilter.value) &&
                    (!startDueDate || dueDate >= startDueDate) &&
                    (!endDueDate || dueDate <= endDueDate) &&
                    (!startInteractionDate || interactionDate >= startInteractionDate) &&
                    (!endInteractionDate || interactionDate <= endInteractionDate)
                );
            });
        });

        const showDetail = (id) => {
            console.log(id);
            router.push({ name: 'DetailModal', params: { id: id.toString() } });
        };

        const updateHeaderOrder = (event) => {
            
        };

        return {
            search,
            countryFilter,
            genderFilter,
            contactChannelFilter,
            statusFilter,
            dueDateStart,
            dueDateEnd,
            startMenu,
            endMenu,
            interactionCreationStartDate,
            interactionCreationEndDate,
            interactionCreationStartMenu,
            interactionCreationEndMenu,
            filteredItems,
            headers,
            uniqueCountries,
            contactChannels,
            statuses,
            draggableHeaders,
            updateHeaderOrder,
            showDetail,
            getStatusColorAndIcon,
            getDueDateColor,
            getContactChannelIcon
        };
    },
});
</script>
