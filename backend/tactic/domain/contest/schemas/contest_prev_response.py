class ContestPrevResponse:
    memberId: int
    profileImage: str
    returns: float

    def __init__(self, member_id: int, profile_image: str, ticket: int, result_money: float):
        self.memberId = member_id
        self.profileImage = profile_image
        self.returns = (result_money - ticket * 10000000) / (ticket * 10000000) * 100


