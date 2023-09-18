"""goals added

Revision ID: 9b675107ae1f
Revises: 27b2d85c028b
Create Date: 2023-06-16 15:35:44.092111

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9b675107ae1f'
down_revision = '27b2d85c028b'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('goal',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_goal_id'), 'goal', ['id'], unique=False)
    op.create_table('requirement',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('goalId', sa.Integer(), nullable=True),
    sa.Column('objectId', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_requirement_id'), 'requirement', ['id'], unique=False)
    op.add_column('object', sa.Column('proof', sa.String(), nullable=True))
    op.add_column('object', sa.Column('isGoal', sa.Boolean(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('object', 'isGoal')
    op.drop_column('object', 'proof')
    op.drop_index(op.f('ix_requirement_id'), table_name='requirement')
    op.drop_table('requirement')
    op.drop_index(op.f('ix_goal_id'), table_name='goal')
    op.drop_table('goal')
    # ### end Alembic commands ###