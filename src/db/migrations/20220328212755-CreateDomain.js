"use strict";

module.exports = {
	/**
	 * @typedef {import('sequelize').Sequelize} Sequelize
	 * @typedef {import('sequelize').QueryInterface} QueryInterface
	 */

	/**
	 * @param {QueryInterface} queryInterface
	 * @param {Sequelize} Sequelize
	 * @returns
	 */
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('domains', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				unique: true
			},
			domain_id:{
				type:Sequelize.STRING,
				unique:true
			},
			domain: {
				type: Sequelize.STRING,
				allowNull: false
			},
			domain_aliases: {
				type: Sequelize.ARRAY(Sequelize.STRING),
				allowNull: false
			},
			additional_information:{
				type: Sequelize.JSONB,
				allowNull: false
			},
			created_at: Sequelize.DATE,
			updated_at: Sequelize.DATE
		});

		},
/**
	 * @param {QueryInterface} queryInterface
	 * @param {Sequelize} Sequelize
	 * @returns
	 */
	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('domains');
	}
};
