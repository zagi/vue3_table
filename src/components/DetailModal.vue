<template>
    <v-dialog v-model="open" persistent max-width="800px">
        <v-card>
            <v-card-title class="text-h5">
                {{ itemDetail.customer.first_name }} {{ itemDetail.customer.last_name }}
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="5">
                            <div><strong>Email:</strong> <a :href="`mailto:${itemDetail.customer.email}`">{{
        itemDetail.customer.email }}</a></div>
                            <div><strong>Phone:</strong> <a :href="`tel:${itemDetail.customer.phone}`">{{
        itemDetail.customer.phone }}</a></div>
                            <div>
                                <strong>Gender:</strong>
                                <v-tooltip :text="itemDetail.customer.gender">
                                    <template v-slot:activator="{ props }">
                                        <v-icon v-bind="props"
                                            :color="itemDetail.customer.gender === 'Male' ? 'blue' : 'pink'">
                                            {{ itemDetail.customer.gender === 'Male' ? 'mdi-gender-male' :
        'mdi-gender-female' }}
                                        </v-icon>
                                    </template>
                                </v-tooltip>
                            </div>
                            <div>
                                <strong>Status:</strong>
                                <v-chip :color="getStatusColorAndIcon(itemDetail.status).color" dark>
                                    <v-tooltip :text="itemDetail.status">
                                        <template v-slot:activator="{ props }">
                                            <v-icon v-bind="props">{{ getStatusColorAndIcon(itemDetail.status).icon
                                                }}</v-icon>
                                        </template>
                                    </v-tooltip>
                                </v-chip>
                            </div>
                            <div>
                                <strong>Country:</strong>
                                <v-tooltip :text="itemDetail.customer.country_code"
                                    v-if="itemDetail.customer.country_code">
                                    <template v-slot:activator="{ props }">
                                        <country-flag v-bind="props"
                                            :country="itemDetail.customer.country_code.toLowerCase()" size="small" />
                                    </template>
                                </v-tooltip>
                                <template v-else>
                                    UNKNOWN
                                </template>
                            </div>
                            <div>
                                <strong>Contact Channel:</strong>
                                <v-tooltip :text="itemDetail.contact_channel">
                                    <template v-slot:activator="{ props }">
                                        <v-icon v-bind="props">
                                            {{ getContactChannelIcon(itemDetail.contact_channel) }}
                                        </v-icon>
                                    </template>
                                </v-tooltip>
                            </div>
                            <div><strong>Assigned To:</strong> {{ itemDetail.assignedTO }}</div>
                        </v-col>
                        <v-col cols="12" md="7">
                            <div><strong>Last Comment:</strong> {{ itemDetail.last_comment }}</div>
                            <div>
                                <strong>Interaction Creation Date:</strong>
                                {{ new Date(itemDetail.interaction_creation_date).toLocaleString('en-GB', {
                                    timeZone:
                                        'UTC'
                                }) }}
                            </div>
                            <div>
                                <strong>Due Date:</strong>
                                <span :class="`due-date ${getDueDateColor(itemDetail.due_date)}`">
                                    {{ new Date(itemDetail.due_date).toLocaleString('en-GB', { timeZone: 'UTC' }) }}
                                </span>
                            </div>
                            <div>
                                <strong>Attachments:</strong>
                                {{ itemDetail.attachments }}
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="closeModal">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CountryFlag from 'vue-country-flag-next';
import mockData from '@/mocks/MOCK_DATA.json';

import { getStatusColorAndIcon, getDueDateColor, getContactChannelIcon } from '@/utils'

export default defineComponent({
    components: {
        CountryFlag
    },
    setup() {
        const open = ref(false);
        const itemDetail = ref(null);
        const route = useRoute();
        const router = useRouter();

        const fetchItemDetail = (id) => {
            const item = mockData.find(data => data.id.toString() === id);
            if (item) {
                itemDetail.value = item;
            }
        };

        onMounted(() => {
            if (route.params.id) {
                fetchItemDetail(route.params.id);
                open.value = true;
            }
        });

        watch(() => route.path, () => {
            if (route.name !== 'DetailModal') {
                open.value = false;
            }
        });

        const closeModal = () => {
            open.value = false;
            router.push({ name: 'Home' }).catch(() => { });
        };

        return {
            itemDetail,
            open,
            closeModal,
            getDueDateColor,
            getStatusColorAndIcon,
            getContactChannelIcon
        };
    },
});
</script>