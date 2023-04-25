<template>
	<div class="container poll">
		<div class="card">
  			<div class="card-body">
				<!-- <div class="row">
					<div class="col-12">
						<h3 class="card-title">Encuesta</h3>
					</div>
				</div> -->

				<form
					id="form-poll"
					@submit.prevent="save($event)"
					method="post"
				>
					<div class="row">
						<FormSelect 
							:style="{ marginBottom: '2vh' }"
							:items="hair_experts"
							:label="'Experto en cosmética'"
							:placeholder="'Experto en cosmética'"
							:required="1"
							:name="'client[hair_expert_id]'"
						/>
						<FormInput
							:style="{ marginBottom: '2vh' }"
							:type="'text'"
							:label="'Email'"
							:placeholder="'Email'"
							:required="1"
							:name="'client[email]'"
						/>
						<FormInput
							:style="{ marginBottom: '2vh' }"
							:type="'date'"
							:label="'Fecha nacimiento'"
							:placeholder="'Fecha nacimiento'"
							:required="1"
							:name="'client[birth_date]'"
						/>
						<FormInput
							:style="{ marginBottom: '2vh' }"
							:type="'text'"
							:label="'Celular'"
							:placeholder="'Celular'"
							:required="1"
							:name="'client[number_phone]'"
						/>
						<FormInput
							:style="{ marginBottom: '2vh' }"
							:type="'text'"
							:label="'Primer nombre'"
							:placeholder="'Primer nombre'"
							:required="1"
							:name="'client[name]'"
						/>
						<FormInput
							:style="{ marginBottom: '2vh' }"
							:type="'text'"
							:label="'Segundo nombre'"
							:placeholder="'Segundo nombre'"
							:required="0"
							:name="'client[second_name]'"
						/>
						<FormInput
							:style="{ marginBottom: '2vh' }"
							:type="'text'"
							:label="'Primer apellido'"
							:placeholder="'Primer apellido'"
							:required="0"
							:name="'client[surname]'"
						/>
						<FormInput
							:style="{ marginBottom: '2vh' }"
							:type="'text'"
							:label="'Segundo apellido'"
							:placeholder="'Segundo apellido'"
							:required="0"
							:name="'client[second_surname]'"
						/>
					</div>
					<div class="row">
						<template v-for="item in poll_questions" :key="item.id">
							<FormSelect 
								v-if="item.type == 'select'"
								:style="{ marginBottom: '2vh' }"
								:items="item.values_format"
								:type="item.type"
								:label="item.label"
								:placeholder="item.placeholder"
								:required="item.required"
								:class="item.class"
								:name="'poll_answers[' + item.name + ']'"
							/>
							<FormInput
								v-else-if="item.type == 'text'"
								:style="{ marginBottom: '2vh' }"
								:type="item.type"
								:label="item.label"
								:placeholder="item.placeholder"
								:required="item.required"
								:class="item.class"
								:name="'poll_answers[' + item.name + ']'"
							/>
							<FormText
								v-else-if="item.type == 'textarea'"
								:style="{ marginBottom: '2vh' }"
								:items="item.values_format"
								:type="item.type"
								:label="item.label"
								:placeholder="item.placeholder"
								:required="item.required"
								:class="item.class"
								:name="'poll_answers[' + item.name + ']'"
							/>
						</template>
					</div>
					<div class="row">
						<div class="col-12">
							<button type="submit" class="btn btn-primary">Guardar</button>
						</div>
					</div>
				</form>
				
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import questions from '@/store/questions';
import hair_expert from '@/store/hair_expert';
import poll from '@/store/poll';

const data_poll = ref([]);
const poll_questions = ref([]);
const hair_experts = ref([]);

const findQuestions = async () => {
  	const response = await questions.dispatch('getByPoll', { code: 'diagnostico_capilar' });

	if (response.success){
		data_poll.value = response.data;
		poll_questions.value = response.data.questions;
	}
}

const findHairExperts = async () => {
  	const response = await hair_expert.dispatch('findHairExperts');

	if (response.success){
		hair_experts.value = response.data;
	}
}

const save = async (event) => {
	const bodyFormData = new FormData();
	bodyFormData.append('type_poll_id', data_poll.value.id);
	Array.from(event.target.elements).forEach(function(item) {
		bodyFormData.append(item.name, item.value);
	});

	const response = await poll.dispatch('create', bodyFormData);

	if (response.success){
		Array.from(event.target.elements).forEach(function(item) {
			item.value = '';
		});
	}
}

findQuestions();
findHairExperts();
</script>

<style scoped>
.poll{
	padding: 3vh;
}
</style>